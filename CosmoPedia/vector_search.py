import json
import numpy as np
import faiss
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List, Dict, Any, Tuple
import os
import pickle

class SpaceKnowledgeBase:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = data_dir
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.index = None
        self.documents = []
        self.embeddings = None
        self.index_path = "knowledge_base_index.faiss"
        self.docs_path = "knowledge_base_docs.pkl"
        
        # Load or create knowledge base
        self._load_or_create_index()
    
    def _load_json_files(self) -> List[Dict[str, Any]]:
        """Load all JSON data files and extract documents"""
        documents = []
        
        # File mappings for different data types
        data_files = {
            'space_terminology.json': self._process_terminology,
            'space_agencies.json': self._process_agencies,
            'planets.json': self._process_planets,
            'rockets.json': self._process_rockets,
            'astronauts.json': self._process_astronauts,
            'telescopes.json': self._process_telescopes,
            'space_museams.json': self._process_museums,
            'notable_peoples.json': self._process_notable_people
        }
        
        for filename, processor in data_files.items():
            file_path = os.path.join(self.data_dir, filename)
            if os.path.exists(file_path):
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                    documents.extend(processor(data))
                    print(f"Loaded {filename}: {len(processor(data))} documents")
                except Exception as e:
                    print(f"Error loading {filename}: {e}")
        
        return documents
    
    def _process_terminology(self, data: Dict) -> List[Dict[str, Any]]:
        """Process space terminology data"""
        docs = []
        for term in data.get('space_terms', []):
            doc = {
                'id': f"term_{term.get('id', '')}",
                'type': 'terminology',
                'title': term.get('term', ''),
                'content': f"{term.get('term', '')}. {term.get('short_description', '')} {term.get('detailed_description', '')}",
                'category': term.get('category', ''),
                'metadata': {
                    'category': term.get('category', ''),
                    'difficulty': term.get('difficulty_level', ''),
                    'related_terms': term.get('related_terms', [])
                }
            }
            docs.append(doc)
        return docs
    
    def _process_agencies(self, data: Dict) -> List[Dict[str, Any]]:
        """Process space agencies data"""
        docs = []
        for agency in data.get('space_agencies', []):
            doc = {
                'id': f"agency_{agency.get('id', '')}",
                'type': 'agency',
                'title': agency.get('name', ''),
                'content': f"{agency.get('full_name', '')}. {agency.get('description', '')} Founded: {agency.get('founded', '')}. Country: {agency.get('country', '')}",
                'category': agency.get('type', ''),
                'metadata': {
                    'country': agency.get('country', ''),
                    'founded': agency.get('founded', ''),
                    'type': agency.get('type', ''),
                    'headquarters': agency.get('headquarters', ''),
                    'budget': agency.get('annual_budget', '')
                }
            }
            docs.append(doc)
        return docs
    
    def _process_planets(self, data: Dict) -> List[Dict[str, Any]]:
        """Process planets data"""
        docs = []
        for planet in data.get('planets', []):
            doc = {
                'id': f"planet_{planet.get('id', '')}",
                'type': 'planet',
                'title': planet.get('name', ''),
                'content': f"{planet.get('name', '')}. {planet.get('description', '')} Distance from Sun: {planet.get('distance_from_sun', '')}. Type: {planet.get('type', '')}",
                'category': planet.get('type', ''),
                'metadata': {
                    'type': planet.get('type', ''),
                    'distance_from_sun': planet.get('distance_from_sun', ''),
                    'diameter': planet.get('diameter', ''),
                    'moons': planet.get('moons', ''),
                    'key_features': planet.get('key_features', [])
                }
            }
            docs.append(doc)
        return docs
    
    def _process_rockets(self, data: Dict) -> List[Dict[str, Any]]:
        """Process rockets data"""
        docs = []
        for rocket in data.get('rockets', []):
            doc = {
                'id': f"rocket_{rocket.get('id', '')}",
                'type': 'rocket',
                'title': rocket.get('name', ''),
                'content': f"{rocket.get('name', '')}. {rocket.get('description', '')} First flight: {rocket.get('first_flight_year', '')}. Purpose: {rocket.get('purpose', '')}",
                'category': rocket.get('type', ''),
                'metadata': {
                    'country_of_origin': rocket.get('country_of_origin', ''),
                    'operator': rocket.get('operator', ''),
                    'first_flight_year': rocket.get('first_flight_year', ''),
                    'payload_capacity': rocket.get('capacity_payload_kg', ''),
                    'active': rocket.get('active', False)
                }
            }
            docs.append(doc)
        return docs
    
    def _process_astronauts(self, data: Dict) -> List[Dict[str, Any]]:
        """Process astronauts data"""
        docs = []
        for astronaut in data.get('astronauts', []):
            doc = {
                'id': f"astronaut_{astronaut.get('id', '')}",
                'type': 'astronaut',
                'title': astronaut.get('name', ''),
                'content': f"{astronaut.get('name', '')}. {astronaut.get('description', '')} Agency: {astronaut.get('agency', '')}. Country: {astronaut.get('country', '')}",
                'category': astronaut.get('type', ''),
                'metadata': {
                    'country': astronaut.get('country', ''),
                    'agency': astronaut.get('agency', ''),
                    'birth_year': astronaut.get('birth_year', ''),
                    'missions_count': astronaut.get('missions_count', ''),
                    'achievements': astronaut.get('achievements', [])
                }
            }
            docs.append(doc)
        return docs
    
    def _process_telescopes(self, data: Dict) -> List[Dict[str, Any]]:
        """Process telescopes data"""
        docs = []
        for telescope in data.get('telescopes', []):
            doc = {
                'id': f"telescope_{telescope.get('id', '')}",
                'type': 'telescope',
                'title': telescope.get('name', ''),
                'content': f"{telescope.get('name', '')}. {telescope.get('description', '')} Type: {telescope.get('type', '')}. Status: {telescope.get('status', '')}",
                'category': telescope.get('type', ''),
                'metadata': {
                    'type': telescope.get('type', ''),
                    'country': telescope.get('country', ''),
                    'agency': telescope.get('agency', ''),
                    'year': telescope.get('year', ''),
                    'status': telescope.get('status', '')
                }
            }
            docs.append(doc)
        return docs
    
    def _process_museums(self, data: Dict) -> List[Dict[str, Any]]:
        """Process space museums data"""
        docs = []
        for museum in data.get('space_museums', []):
            doc = {
                'id': f"museum_{museum.get('name', '').replace(' ', '_').lower()}",
                'type': 'museum',
                'title': museum.get('name', ''),
                'content': f"{museum.get('name', '')}. {museum.get('famous_for', '')} Located in {museum.get('city_or_region', '')}, {museum.get('country', '')}. {museum.get('additional_info', '')}",
                'category': 'space_museum',
                'metadata': {
                    'country': museum.get('country', ''),
                    'city_or_region': museum.get('city_or_region', ''),
                    'famous_for': museum.get('famous_for', ''),
                    'established_year': museum.get('established_year', ''),
                    'annual_visitors': museum.get('annual_visitors', ''),
                    'additional_info': museum.get('additional_info', '')
                }
            }
            docs.append(doc)
        return docs
    
    def _process_notable_people(self, data: Dict) -> List[Dict[str, Any]]:
        """Process notable people data"""
        docs = []
        for person in data.get('notable_space_contributors', []):
            doc = {
                'id': f"person_{person.get('name', '').replace(' ', '_').lower()}",
                'type': 'notable_person',
                'title': person.get('name', ''),
                'content': f"{person.get('name', '')}. {person.get('contribution', '')} Known for: {person.get('known_for', '')}. Country: {person.get('country', '')}",
                'category': 'space_pioneer',
                'metadata': {
                    'country': person.get('country', ''),
                    'contribution': person.get('contribution', ''),
                    'known_for': person.get('known_for', ''),
                    'birth_date': person.get('birth_date', ''),
                    'death_date': person.get('death_date', ''),
                    'awards': person.get('awards', [])
                }
            }
            docs.append(doc)
        return docs
    
    def _create_embeddings(self, documents: List[Dict[str, Any]]) -> np.ndarray:
        """Create embeddings for documents"""
        texts = [f"{doc['title']} {doc['content']}" for doc in documents]
        embeddings = self.model.encode(texts, show_progress_bar=True)
        return embeddings
    
    def _create_faiss_index(self, embeddings: np.ndarray) -> faiss.IndexFlatIP:
        """Create FAISS index for cosine similarity search"""
        # Normalize embeddings for cosine similarity
        faiss.normalize_L2(embeddings)
        
        # Create index
        dimension = embeddings.shape[1]
        index = faiss.IndexFlatIP(dimension)  # Inner product for cosine similarity
        index.add(embeddings)
        
        return index
    
    def _load_or_create_index(self):
        """Load existing index or create new one"""
        if os.path.exists(self.index_path) and os.path.exists(self.docs_path):
            try:
                # Load existing index and documents
                self.index = faiss.read_index(self.index_path)
                with open(self.docs_path, 'rb') as f:
                    self.documents = pickle.load(f)
                print(f"Loaded existing knowledge base with {len(self.documents)} documents")
                return
            except Exception as e:
                print(f"Error loading existing index: {e}")
        
        # Create new index
        print("Creating new knowledge base...")
        self.documents = self._load_json_files()
        
        if not self.documents:
            print("No documents found!")
            return
        
        self.embeddings = self._create_embeddings(self.documents)
        self.index = self._create_faiss_index(self.embeddings)
        
        # Save index and documents
        faiss.write_index(self.index, self.index_path)
        with open(self.docs_path, 'wb') as f:
            pickle.dump(self.documents, f)
        
        print(f"Created knowledge base with {len(self.documents)} documents")
    
    def search(self, query: str, top_k: int = 5) -> List[Tuple[Dict[str, Any], float]]:
        """Search for relevant documents using vector similarity"""
        if not self.index or not self.documents:
            return []
        
        # Create query embedding
        query_embedding = self.model.encode([query])
        faiss.normalize_L2(query_embedding)
        
        # Search
        scores, indices = self.index.search(query_embedding, top_k)
        
        # Return results with documents and scores
        results = []
        for i, (score, idx) in enumerate(zip(scores[0], indices[0])):
            if idx >= 0 and idx < len(self.documents):
                results.append((self.documents[idx], float(score)))
        
        return results
    
    def get_context_for_query(self, query: str, max_context_length: int = 2000) -> str:
        """Get relevant context for a query to use with LLM"""
        results = self.search(query, top_k=5)
        
        context_parts = []
        current_length = 0
        
        for doc, score in results:
            doc_text = f"**{doc['type'].title()}: {doc['title']}**\n{doc['content']}\n"
            
            if current_length + len(doc_text) > max_context_length:
                break
            
            context_parts.append(doc_text)
            current_length += len(doc_text)
        
        return "\n".join(context_parts)
    
    def force_regenerate(self):
        """Force regeneration of the knowledge base"""
        print("🔄 Force regenerating knowledge base...")
        
        # Remove existing files
        if os.path.exists(self.index_path):
            os.remove(self.index_path)
        if os.path.exists(self.docs_path):
            os.remove(self.docs_path)
        
        # Recreate
        self._load_or_create_index()
        print(f"✅ Knowledge base regenerated with {len(self.documents)} documents")
