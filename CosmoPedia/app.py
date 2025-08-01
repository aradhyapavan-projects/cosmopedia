from flask import Flask, render_template, jsonify, request
import json
import os
import requests
import time
import random
from functools import wraps
from datetime import datetime

# Try to import vector search with error handling
try:
    from vector_search import SpaceKnowledgeBase
    VECTOR_SEARCH_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Vector search not available due to import error: {e}")
    print("Application will run without advanced vector search features")
    VECTOR_SEARCH_AVAILABLE = False
    SpaceKnowledgeBase = None

app = Flask(__name__)

# Initialize the knowledge base for vector search
knowledge_base = None

def get_knowledge_base():
    """Get or initialize the knowledge base"""
    global knowledge_base
    if not VECTOR_SEARCH_AVAILABLE:
        print("Vector search not available, skipping knowledge base initialization")
        return None
        
    if knowledge_base is None:
        try:
            print("Initializing Space Knowledge Base...")
            knowledge_base = SpaceKnowledgeBase(data_dir="data")
            print("Knowledge base initialized successfully!")
        except Exception as e:
            print(f"Error initializing knowledge base: {e}")
            return None
    return knowledge_base

# Mistral AI configuration
MISTRAL_API_KEY = ""
MISTRAL_API_URL = ""

# Rate limiting tracking
last_api_call_time = 0
MIN_REQUEST_INTERVAL = 2.0  # Minimum 1 second between requests

import time
import random
from functools import wraps

def rate_limit_handler(max_retries=3, base_delay=1):
    """Decorator to handle rate limiting with exponential backoff"""
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except requests.exceptions.HTTPError as e:
                    if e.response.status_code == 429:  # Too Many Requests
                        if attempt < max_retries - 1:
                            # Exponential backoff with jitter
                            delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                            print(f"Rate limit hit. Retrying in {delay:.2f} seconds... (Attempt {attempt + 1}/{max_retries})")
                            time.sleep(delay)
                            continue
                        else:
                            print("Max retries reached. Rate limit exceeded.")
                            raise e
                    else:
                        raise e
                except Exception as e:
                    raise e
            return None
        return wrapper
    return decorator

@rate_limit_handler(max_retries=3, base_delay=2)
def call_mistral_api(message):
    """Call Mistral API with rate limiting and retry logic"""
    global last_api_call_time
    
    try:
        # Ensure minimum interval between requests
        current_time = time.time()
        time_since_last_call = current_time - last_api_call_time
        if time_since_last_call < MIN_REQUEST_INTERVAL:
            sleep_time = MIN_REQUEST_INTERVAL - time_since_last_call
            print(f"Throttling request. Waiting {sleep_time:.2f} seconds...")
            time.sleep(sleep_time)
        
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {MISTRAL_API_KEY}"
        }
        
        data = {
            "model": "mistral-large-latest",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a knowledgeable space exploration assistant. You help users learn about space, astronomy, rockets, astronauts, planets, telescopes, and space agencies. Use the provided context to give accurate and informative answers. Always be helpful and informative about space-related topics. If you don't know something, say so rather than making up information. Be enthusiastic about space exploration and discovery."
                },
                {
                    "role": "user",
                    "content": message
                }
            ],
            "temperature": 0.7,
            "max_tokens": 3000
        }
        
        # Record the time of this API call
        last_api_call_time = time.time()
        
        response = requests.post(MISTRAL_API_URL, headers=headers, json=data, timeout=30)
        response.raise_for_status()
        
        result = response.json()
        return result["choices"][0]["message"]["content"]
        
    except requests.RequestException as e:
        print(f"Mistral API Error: {e}")
        if hasattr(e, 'response') and e.response is not None:
            if e.response.status_code == 429:
                raise e  # Let the rate_limit_handler deal with 429 errors
            else:
                print(f"HTTP Error {e.response.status_code}: {e.response.text}")
        raise Exception(f"Failed to get response from Mistral: {str(e)}")

# NASA Images API configuration
NASA_IMAGES_API_BASE = "https://images-api.nasa.gov"

def search_nasa_images(query="", year="", page=1, page_size=20):
    """Search NASA Images API"""
    try:
        params = {
            'q': query if query else 'space',
            'media_type': 'image',
            'page': page,
            'page_size': page_size
        }
        
        if year:
            params['year_start'] = year
            params['year_end'] = year
            
        response = requests.get(f"{NASA_IMAGES_API_BASE}/search", params=params, timeout=10)
        response.raise_for_status()
        
        data = response.json()
        items = []
        
        if 'collection' in data and 'items' in data['collection']:
            for item in data['collection']['items']:
                if 'data' in item and len(item['data']) > 0:
                    item_data = item['data'][0]
                    image_info = {
                        'nasa_id': item_data.get('nasa_id', ''),
                        'title': item_data.get('title', 'Untitled'),
                        'description': item_data.get('description', ''),
                        'date_created': item_data.get('date_created', ''),
                        'center': item_data.get('center', ''),
                        'keywords': item_data.get('keywords', []),
                        'photographer': item_data.get('photographer', ''),
                        'location': item_data.get('location', ''),
                        'href': item.get('href', ''),
                        'thumbnail': ''
                    }
                    
                    # Get thumbnail URL
                    if 'links' in item:
                        for link in item['links']:
                            if link.get('rel') == 'preview':
                                image_info['thumbnail'] = link.get('href', '')
                                break
                    
                    items.append(image_info)
        
        return {
            'items': items,
            'total': data.get('collection', {}).get('metadata', {}).get('total_hits', 0)
        }
        
    except requests.RequestException as e:
        print(f"Error fetching NASA images: {e}")
        return {'items': [], 'total': 0}

# Load space terminology data
def load_space_terms():
    try:
        with open('data/space_terminology.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['space_terms']
    except FileNotFoundError:
        return []

# Load space agencies data
def load_space_agencies():
    try:
        with open('data/space_agencies.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['space_agencies']
    except FileNotFoundError:
        return []

# Load planets data
def load_planets():
    try:
        with open('data/planets.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['planets']
    except FileNotFoundError:
        return []

# Load rockets data
def load_rockets():
    try:
        with open('data/rockets.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['rockets']
    except FileNotFoundError:
        return []

# Load astronauts data
def load_astronauts():
    try:
        with open('data/astronauts.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['astronauts']
    except FileNotFoundError:
        return []

# Load telescopes data
def load_telescopes():
    try:
        with open('data/telescopes.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['telescopes']
    except FileNotFoundError:
        return []

# Load notable people data
def load_notable_people():
    try:
        with open('data/notable_peoples.json', 'r', encoding='utf-8-sig') as f:
            data = json.load(f)
            return data['notable_space_contributors']
    except FileNotFoundError:
        return []

# Load space museums data
def load_space_museums():
    try:
        with open('data/space_museams.json', 'r', encoding='utf-8') as f:
            data = json.load(f)
            return data['space_museums']
    except FileNotFoundError:
        return []

@app.route('/')
def index():
    """Main page with feature cards"""
    return render_template('index.html')

@app.route('/terminologies')
def terminologies():
    """Space terminologies explorer page"""
    return render_template('terminologies.html')

@app.route('/agencies')
def agencies():
    """Space agencies explorer page"""
    return render_template('agencies.html')

@app.route('/planets')
def planets():
    """Planets explorer page"""
    return render_template('planets.html')

@app.route('/rockets')
def rockets():
    """Rockets explorer page"""
    return render_template('rockets.html')

@app.route('/astronauts')
def astronauts():
    """Astronauts explorer page"""
    return render_template('astronauts.html')

@app.route('/telescopes')
def telescopes():
    """Telescopes explorer page"""
    return render_template('telescopes.html')

@app.route('/museums')
def museums():
    """Space museums explorer page"""
    return render_template('museums.html')

@app.route('/chat')
def chat():
    """Space exploration chat interface"""
    return render_template('chat.html')

@app.route('/images')
def images():
    """Space images explorer page"""
    return render_template('images.html')

@app.route('/notable-people')
def notable_people():
    """Notable people in space exploration"""
    return render_template('notable_people.html')

@app.route('/api/terms')
def get_terms():
    """API endpoint to get all space terms"""
    terms = load_space_terms()
    
    # Filter by letter if provided
    letter = request.args.get('letter', '').upper()
    if letter:
        terms = [term for term in terms if term['term'].upper().startswith(letter)]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        terms = [term for term in terms if 
                search_query in term['term'].lower() or 
                search_query in term['short_description'].lower() or
                search_query in term['category'].lower()]
    
    # Sort alphabetically
    terms.sort(key=lambda x: x['term'].lower())
    
    return jsonify(terms)

@app.route('/api/terms/<term_id>')
def get_term_details(term_id):
    """API endpoint to get details of a specific term"""
    terms = load_space_terms()
    term = next((t for t in terms if t['id'] == term_id), None)
    
    if term:
        return jsonify(term)
    else:
        return jsonify({'error': 'Term not found'}), 404

@app.route('/api/categories')
def get_categories():
    """API endpoint to get all available categories"""
    terms = load_space_terms()
    categories = list(set(term['category'] for term in terms))
    categories.sort()
    return jsonify(categories)

@app.route('/api/alphabet')
def get_alphabet_stats():
    """API endpoint to get term count for each letter"""
    terms = load_space_terms()
    alphabet_stats = {}
    
    for letter in 'ABCDEFGHIJKLMNOPQRSTUVWXYZ':
        count = len([term for term in terms if term['term'].upper().startswith(letter)])
        alphabet_stats[letter] = count
    
    return jsonify(alphabet_stats)

@app.route('/api/agencies')
def get_agencies():
    """API endpoint to get all space agencies"""
    agencies = load_space_agencies()
    
    # Filter by type if provided
    agency_type = request.args.get('type', '').lower()
    if agency_type and agency_type != 'all':
        agencies = [agency for agency in agencies if agency['type'].lower() == agency_type]
    
    # Filter by country if provided
    country = request.args.get('country', '')
    if country and country != 'all':
        agencies = [agency for agency in agencies if agency['country'].lower() == country.lower()]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        agencies = [agency for agency in agencies if 
                   search_query in agency['name'].lower() or 
                   search_query in agency['full_name'].lower() or
                   search_query in agency['country'].lower() or
                   search_query in agency['description'].lower()]
    
    # Sort alphabetically
    agencies.sort(key=lambda x: x['name'].lower())
    
    return jsonify(agencies)

@app.route('/api/agencies/<agency_id>')
def get_agency_details(agency_id):
    """API endpoint to get details of a specific agency"""
    agencies = load_space_agencies()
    agency = next((a for a in agencies if a['id'] == agency_id), None)
    
    if agency:
        return jsonify(agency)
    else:
        return jsonify({'error': 'Agency not found'}), 404

@app.route('/api/planets')
def get_planets():
    """API endpoint to get all planets"""
    planets = load_planets()
    
    # Filter by type if provided
    planet_type = request.args.get('type', '').lower()
    if planet_type and planet_type != 'all':
        planets = [planet for planet in planets if planet['type'].lower() == planet_type]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        planets = [planet for planet in planets if 
                  search_query in planet['name'].lower() or 
                  search_query in planet['description'].lower() or
                  search_query in planet['type'].lower()]
    
    # Sort by distance from sun (inner to outer)
    distance_order = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune']
    planets.sort(key=lambda x: distance_order.index(x['id']) if x['id'] in distance_order else 999)
    
    return jsonify(planets)

@app.route('/api/planets/<planet_id>')
def get_planet_details(planet_id):
    """API endpoint to get details of a specific planet"""
    planets = load_planets()
    planet = next((p for p in planets if p['id'] == planet_id), None)
    
    if planet:
        return jsonify(planet)
    else:
        return jsonify({'error': 'Planet not found'}), 404

@app.route('/api/rockets')
def get_rockets():
    """API endpoint to get all rockets"""
    rockets = load_rockets()
    
    # Filter by type if provided
    rocket_type = request.args.get('type', '').lower()
    if rocket_type and rocket_type != 'all':
        rockets = [rocket for rocket in rockets if rocket['type'].lower() == rocket_type]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        rockets = [rocket for rocket in rockets if 
                  search_query in rocket['name'].lower() or 
                  search_query in rocket['description'].lower() or
                  search_query in rocket['type'].lower()]
    
    # Sort alphabetically
    rockets.sort(key=lambda x: x['name'].lower())
    
    return jsonify(rockets)

@app.route('/api/rockets/<rocket_id>')
def get_rocket_details(rocket_id):
    """API endpoint to get details of a specific rocket"""
    rockets = load_rockets()
    rocket = next((r for r in rockets if r['id'] == rocket_id), None)
    
    if rocket:
        return jsonify(rocket)
    else:
        return jsonify({'error': 'Rocket not found'}), 404

@app.route('/api/astronauts')
def get_astronauts():
    """API endpoint to get all astronauts"""
    astronauts = load_astronauts()
    
    # Filter by country if provided
    country = request.args.get('country', '')
    if country and country != 'all':
        astronauts = [astronaut for astronaut in astronauts if astronaut['country'].lower() == country.lower()]
    
    # Filter by agency type if provided
    agency_type = request.args.get('type', '').lower()
    if agency_type and agency_type != 'all':
        astronauts = [astronaut for astronaut in astronauts if astronaut['type'].lower() == agency_type]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        astronauts = [astronaut for astronaut in astronauts if 
                     search_query in astronaut['name'].lower() or 
                     search_query in astronaut['description'].lower() or
                     search_query in astronaut['country'].lower() or
                     search_query in astronaut['agency'].lower()]
    
    # Sort alphabetically by name
    astronauts.sort(key=lambda x: x['name'].lower())
    
    return jsonify(astronauts)

@app.route('/api/astronauts/<astronaut_id>')
def get_astronaut_details(astronaut_id):
    """API endpoint to get details of a specific astronaut"""
    astronauts = load_astronauts()
    astronaut = next((a for a in astronauts if a['id'] == astronaut_id), None)
    
    if astronaut:
        return jsonify(astronaut)
    else:
        return jsonify({'error': 'Astronaut not found'}), 404

@app.route('/api/telescopes')
def get_telescopes():
    """API endpoint to get all telescopes"""
    telescopes = load_telescopes()
    
    # Filter by type if provided
    telescope_type = request.args.get('type', '').lower()
    if telescope_type and telescope_type != 'all':
        telescopes = [telescope for telescope in telescopes if telescope['type'].lower() == telescope_type]
    
    # Filter by country if provided
    country = request.args.get('country', '')
    if country and country != 'all':
        telescopes = [telescope for telescope in telescopes if telescope['country'].lower() == country.lower()]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        telescopes = [telescope for telescope in telescopes if 
                     search_query in telescope['name'].lower() or 
                     search_query in telescope['description'].lower() or
                     search_query in telescope['country'].lower() or
                     search_query in telescope['inventor'].lower()]
    
    # Sort by year (newest first)
    telescopes.sort(key=lambda x: x.get('year', 0), reverse=True)
    
    return jsonify(telescopes)

@app.route('/api/telescopes/<telescope_id>')
def get_telescope_details(telescope_id):
    """API endpoint to get details of a specific telescope"""
    telescopes = load_telescopes()
    telescope = next((t for t in telescopes if t['id'] == telescope_id), None)
    
    if telescope:
        return jsonify(telescope)
    else:
        return jsonify({'error': 'Telescope not found'}), 404

@app.route('/api/notable-people')
def get_notable_people():
    """API endpoint to get all notable people"""
    people = load_notable_people()
    
    # Filter by country if provided
    country = request.args.get('country', '')
    if country and country != 'all':
        people = [person for person in people if person['country'].lower() == country.lower()]
    
    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        people = [person for person in people if 
                 search_query in person['name'].lower() or 
                 search_query in person['contribution'].lower() or
                 search_query in person['known_for'].lower() or
                 search_query in person['country'].lower()]
    
    # Sort alphabetically by name
    people.sort(key=lambda x: x['name'].lower())
    
    return jsonify(people)

@app.route('/api/notable-people/<person_name>')
def get_notable_person_details(person_name):
    """API endpoint to get details of a specific notable person"""
    people = load_notable_people()
    # URL decode and normalize the name for comparison
    normalized_name = person_name.replace('-', ' ').replace('_', ' ').lower()
    person = next((p for p in people if p['name'].lower() == normalized_name), None)
    
    if person:
        return jsonify(person)
    else:
        return jsonify({'error': 'Person not found'}), 404

@app.route('/api/images')
def get_images():
    """API endpoint to get space images from NASA API"""
    # Get query parameters
    search_query = request.args.get('search', '')
    year = request.args.get('year', '')
    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 20, type=int)
    
    # Search NASA Images API
    result = search_nasa_images(search_query, year, page, page_size)
    
    return jsonify(result)

@app.route('/api/museums')
def get_museums():
    """API endpoint to get all space museums with search, country filter, and pagination"""
    museums = load_space_museums()

    # Filter by country if provided
    country = request.args.get('country', '')
    if country and country != 'all':
        museums = [museum for museum in museums if museum['country'].lower() == country.lower()]

    # Filter by search query if provided
    search_query = request.args.get('search', '').lower()
    if search_query:
        museums = [museum for museum in museums if 
            search_query in museum['name'].lower() or
            search_query in museum['city_or_region'].lower() or
            search_query in museum['famous_for'].lower() or
            search_query in museum['country'].lower() or
            search_query in (museum.get('additional_info', '').lower())]

    # Sort alphabetically by name
    museums.sort(key=lambda x: x['name'].lower())

    # Pagination
    page = request.args.get('page', 1, type=int)
    page_size = request.args.get('page_size', 20, type=int)
    total = len(museums)
    start = (page - 1) * page_size
    end = start + page_size
    paginated = museums[start:end]

    return jsonify({
        'items': paginated,
        'total': total,
        'page': page,
        'page_size': page_size
    })

@app.route('/api/museums/<museum_name>')
def get_museum_details(museum_name):
    """API endpoint to get details of a specific museum by name (normalized)"""
    museums = load_space_museums()
    normalized_name = museum_name.replace('-', ' ').replace('_', ' ').lower()
    museum = next((m for m in museums if m['name'].lower() == normalized_name), None)
    if museum:
        return jsonify(museum)
    else:
        return jsonify({'error': 'Museum not found'}), 404

def get_knowledge_base_context(query, max_items=5, max_context_length=2000):
    """Get relevant context from the knowledge base using vector search for RAG"""
    try:
        if not VECTOR_SEARCH_AVAILABLE:
            print("Vector search not available, using fallback context search")
            return get_fallback_context(query, max_items)
            
        kb = get_knowledge_base()
        if not kb:
            print("Knowledge base not available, falling back to keyword search")
            return get_fallback_context(query, max_items)
        
        # Use vector search to find relevant context
        context = kb.get_context_for_query(query, max_context_length=max_context_length)
        
        if context:
            print(f"Vector search found context (length: {len(context)})")
            return context
        else:
            print("No relevant context found through vector search, using fallback")
            return get_fallback_context(query, max_items)
            
    except Exception as e:
        print(f"Error in vector search: {e}")
        # Fallback to simple keyword search if vector search fails
        return get_fallback_context(query, max_items)

def get_fallback_context(query, max_items=5):
    """Fallback keyword-based context search if vector search fails"""
    context_items = []
    query_lower = query.lower()
    
    # Search space terms
    terms = load_space_terms()
    relevant_terms = []
    for term in terms:
        if (query_lower in term['term'].lower() or 
            query_lower in term['short_description'].lower() or
            query_lower in term['detailed_description'].lower() or
            any(query_lower in keyword.lower() for keyword in term.get('keywords', []))):
            relevant_terms.append(term)
    
    # Add top relevant terms to context
    for term in relevant_terms[:max_items//2]:
        context_items.append(f"**{term['term']}**: {term['detailed_description']}")
    
    # Search space agencies
    agencies = load_space_agencies()
    relevant_agencies = []
    for agency in agencies:
        if (query_lower in agency['name'].lower() or 
            query_lower in agency['full_name'].lower() or
            query_lower in agency['description'].lower() or
            query_lower in agency['country'].lower()):
            relevant_agencies.append(agency)
    
    # Add relevant agencies to context
    for agency in relevant_agencies[:2]:
        context_items.append(f"**{agency['name']} ({agency['full_name']})**: {agency['description']}")
    
    # Search planets
    planets = load_planets()
    relevant_planets = []
    for planet in planets:
        if (query_lower in planet['name'].lower() or 
            query_lower in planet['description'].lower()):
            relevant_planets.append(planet)
    
    # Add relevant planets to context
    for planet in relevant_planets[:2]:
        context_items.append(f"**{planet['name']}**: {planet['description']}")
    
    # Search rockets
    rockets = load_rockets()
    relevant_rockets = []
    for rocket in rockets:
        if (query_lower in rocket['name'].lower() or 
            query_lower in rocket['description'].lower()):
            relevant_rockets.append(rocket)
    
    # Add relevant rockets to context
    for rocket in relevant_rockets[:2]:
        context_items.append(f"**{rocket['name']}**: {rocket['description']}")
    
    # Search astronauts
    astronauts = load_astronauts()
    relevant_astronauts = []
    for astronaut in astronauts:
        if (query_lower in astronaut['name'].lower() or 
            query_lower in astronaut['description'].lower() or
            query_lower in astronaut['agency'].lower()):
            relevant_astronauts.append(astronaut)
    
    # Add relevant astronauts to context
    for astronaut in relevant_astronauts[:2]:
        context_items.append(f"**{astronaut['name']}**: {astronaut['description']}")
    
    # Search telescopes
    telescopes = load_telescopes()
    relevant_telescopes = []
    for telescope in telescopes:
        if (query_lower in telescope['name'].lower() or 
            query_lower in telescope['description'].lower()):
            relevant_telescopes.append(telescope)
    
    # Add relevant telescopes to context
    for telescope in relevant_telescopes[:2]:
        context_items.append(f"**{telescope['name']}**: {telescope['description']}")
    
    # Search museums
    museums = load_space_museums()
    relevant_museums = []
    for museum in museums:
        if (query_lower in museum['name'].lower() or 
            query_lower in museum['famous_for'].lower() or
            query_lower in museum['country'].lower() or
            query_lower in museum['city_or_region'].lower()):
            relevant_museums.append(museum)
    
    # Add relevant museums to context
    for museum in relevant_museums[:2]:
        context_items.append(f"**{museum['name']}**: {museum['famous_for']} Located in {museum['city_or_region']}, {museum['country']}")
    
    # Search notable people
    notable_people = load_notable_people()
    relevant_people = []
    for person in notable_people:
        if (query_lower in person['name'].lower() or 
            query_lower in person['contribution'].lower() or
            query_lower in person['known_for'].lower() or
            query_lower in person['country'].lower()):
            relevant_people.append(person)
    
    # Add relevant people to context
    for person in relevant_people[:2]:
        context_items.append(f"**{person['name']}**: {person['contribution']} Known for: {person['known_for']}")
    
    return "\n\n".join(context_items[:max_items])

@app.route('/api/chat', methods=['POST'])
def chat_api():
    """API endpoint for chat with RAG-enhanced responses"""
    try:
        data = request.get_json()
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({'error': 'Message is required'}), 400
        
        print(f"Debug: Received message: {user_message}")
        
        # Get relevant context from knowledge base
        context = get_knowledge_base_context(user_message, max_items=8)
        
        print(f"Debug: Context found: {bool(context)}")
        if context:
            print(f"Debug: Context preview: {context[:200]}...")
        
        # Prepare the message with context
        if context:
            enhanced_message = f"""Context from Space Knowledge Base:
{context}

User Question: {user_message}

Please answer the user's question using the provided context when relevant. If the context doesn't contain relevant information, feel free to use your general knowledge about space exploration."""
        else:
            enhanced_message = f"User Question: {user_message}"
        
        print(f"Debug: Sending message to Mistral: {enhanced_message[:100]}...")
        
        try:
            # Get response from Mistral API with improved error handling
            print("Calling Mistral API...")
            response_text = call_mistral_api(enhanced_message)
            print(f"Debug: API response received successfully")
            
        except requests.exceptions.HTTPError as http_error:
            print(f"Mistral API HTTP Error: {http_error}")
            if hasattr(http_error, 'response') and http_error.response.status_code == 429:
                # Rate limit specific error
                response_text = "⚠️ The AI assistant is currently experiencing high demand. Please wait a moment and try again. In the meantime, here's what I found in our knowledge base:\n\n" + (context if context else "Please search our database directly for space information.")
            else:
                # Other HTTP errors
                response_text = f"🔧 The AI assistant encountered a technical issue (HTTP {http_error.response.status_code if hasattr(http_error, 'response') else 'Unknown'}). " + (f"Here's relevant information from our knowledge base:\n\n{context}" if context else "Please try again later.")
                
        except Exception as mistral_error:
            print(f"Mistral API General Error: {mistral_error}")
            # Fallback response using context only
            if context:
                response_text = f"🤖 I'm having trouble connecting to the AI assistant right now, but I found this relevant information in our space knowledge base:\n\n{context}\n\n💡 This should help answer your question about '{user_message}'. Feel free to ask for more details!"
            else:
                response_text = f"🚀 I'm experiencing technical difficulties with the AI assistant at the moment. Please try rephrasing your question or browse our space database directly. Common topics include: planets, rockets, astronauts, space agencies, and telescopes."
        
        return jsonify({
            'response': response_text,
            'context_used': bool(context),
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        print(f"Error in chat API: {e}")
        import traceback
        traceback.print_exc()
        return jsonify({'error': f'An error occurred: {str(e)}'}), 500

if __name__ == "__main__":
    app.run(debug=True, threaded=True)

