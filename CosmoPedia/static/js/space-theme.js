/**
 * Cosmopedia - Ultra Modern Theme JavaScript
 * Advanced animations, interactions, and visual effects
 */

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeAnimations();
    initializeScrollEffects();
    initializeParallax();
    initializeParticles();
    initializeInteractiveElements();
});

/**
 * Initialize theme features
 */
function initializeTheme() {
    // Add loading states to buttons
    addButtonLoadingStates();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Initialize documentation modal
    initializeDocumentationModal();
    
    // Add smooth reveal animations
    initializeRevealAnimations();
}

/**
 * Initialize advanced animations
 */
function initializeAnimations() {
    // Staggered card animations
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
        card.classList.add('fade-in-up');
        
        // Add magnetic effect
        addMagneticEffect(card);
    });
    
    // Enhanced feature icon animations
    const icons = document.querySelectorAll('.feature-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            this.style.filter = 'drop-shadow(0 0 20px rgba(0, 212, 255, 0.7))';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.filter = 'none';
        });
    });
    
    // Typing animation for hero title
    initializeTypingAnimation();
    
    // Floating elements animation
    initializeFloatingElements();
}

/**
 * Initialize reveal animations on scroll
 */
function initializeRevealAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.card, .btn, .feature-icon');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('slide-in-bottom');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section, .card, .hero-section').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Add magnetic effect to elements
 */
function addMagneticEffect(element) {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const intensity = 0.3;
        element.style.transform = `translate(${x * intensity}px, ${y * intensity}px) scale(1.02)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0) scale(1)';
    });
}

/**
 * Initialize parallax effects
 */
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Parallax for cards
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            const cardRate = scrolled * (-0.1 - index * 0.02);
            card.style.transform = `translateY(${cardRate}px)`;
        });
    });
}

/**
 * Initialize floating particles effect
 */
function initializeParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.6';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.floor(window.innerWidth / 20);
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.y > canvas.height) particle.y = 0;
            if (particle.y < 0) particle.y = canvas.height;
            
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    resizeCanvas();
    createParticles();
    animateParticles();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}
    });
}

/**
 * Initialize scroll effects
 */
function initializeScrollEffects() {
    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);
    
    // Observe cards that aren't already animated
    const unobservedCards = document.querySelectorAll('.card:not(.fade-in-up)');
    unobservedCards.forEach(card => observer.observe(card));
}

/**
 * Add loading states to buttons
 */
function addButtonLoadingStates() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Don't add loading to close buttons or navigation
            if (this.classList.contains('btn-close') || 
                this.classList.contains('nav-link') ||
                this.hasAttribute('data-bs-dismiss')) {
                return;
            }
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<div class="loading-spinner me-2"></div>Loading...';
            this.disabled = true;
            
            // Remove loading state after 2 seconds (or when action completes)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

/**
 * Initialize tooltips
 */
function initializeTooltips() {
    // Initialize Bootstrap tooltips if available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Add enhanced hover effects to cards
 */
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Smooth scroll to elements
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Show notification toast
 */
function showToast(message, type = 'info') {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');
    
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    
    // Add to page
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    toastContainer.appendChild(toast);
    
    // Initialize and show toast
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();
        
        // Remove from DOM after hiding
        toast.addEventListener('hidden.bs.toast', function() {
            this.remove();
        });
    } else {
        // Fallback without Bootstrap
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

/**
 * Copy text to clipboard
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy to clipboard', 'danger');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            showToast('Copied to clipboard!', 'success');
        } catch (err) {
            showToast('Failed to copy to clipboard', 'danger');
        }
        
        document.body.removeChild(textArea);
    }
}

/**
 * Format numbers with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format dates to readable format
 */
function formatDate(dateString) {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

/**
 * Debounce function for search inputs
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Create loading overlay
 */
function showLoadingOverlay(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'loadingOverlay';
    overlay.className = 'position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center';
    overlay.style.cssText = `
        background: rgba(10, 14, 39, 0.9);
        backdrop-filter: blur(10px);
        z-index: 9999;
    `;
    
    overlay.innerHTML = `
        <div class="text-center text-white">
            <div class="loading-spinner mb-3" style="width: 3rem; height: 3rem;"></div>
            <h5>${message}</h5>
        </div>
    `;
    
    document.body.appendChild(overlay);
    return overlay;
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

/**
 * Validate form inputs
 */
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('is-invalid');
            isValid = false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        }
    });
    
    return isValid;
}

/**
 * Create star rating display
 */
function createStarRating(rating, maxStars = 5) {
    const container = document.createElement('div');
    container.className = 'star-rating';
    
    for (let i = 1; i <= maxStars; i++) {
        const star = document.createElement('i');
        star.className = i <= rating ? 'fas fa-star text-warning' : 'far fa-star text-muted';
        container.appendChild(star);
    }
    
    return container;
}

/**
 * Handle image loading errors
 */
function handleImageError(img) {
    img.style.display = 'none';
    
    // Show placeholder
    const placeholder = img.nextElementSibling;
    if (placeholder) {
        placeholder.style.display = 'flex';
    }
}

/**
 * Initialize image lazy loading
 */
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers without IntersectionObserver
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

/**
 * Initialize Documentation Modal
 */
function initializeDocumentationModal() {
    const documentationModal = document.getElementById('documentationModal');
    if (documentationModal) {
        // Add event listeners for modal events
        documentationModal.addEventListener('show.bs.modal', function () {
            console.log('Documentation modal opening');
            // Add any pre-show logic here
        });

        documentationModal.addEventListener('shown.bs.modal', function () {
            console.log('Documentation modal opened');
            // Focus on close button for accessibility
            const closeButton = this.querySelector('.btn-close');
            if (closeButton) {
                closeButton.focus();
            }
        });

        documentationModal.addEventListener('hide.bs.modal', function () {
            console.log('Documentation modal closing');
            // Add any pre-hide logic here
        });

        documentationModal.addEventListener('hidden.bs.modal', function () {
            console.log('Documentation modal closed');
            // Add any post-hide logic here
        });
    }

    // Add click handler for documentation button
    const docButton = document.querySelector('[data-bs-target="#documentationModal"]');
    if (docButton) {
        docButton.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Documentation button clicked');
            
            // Ensure modal exists and Bootstrap is available
            if (documentationModal && typeof bootstrap !== 'undefined') {
                const modal = new bootstrap.Modal(documentationModal);
                modal.show();
            } else {
                console.error('Modal or Bootstrap not found');
            }
        });
    }
}

// Initialize lazy loading
initializeLazyLoading();

// Initialize documentation modal
initializeDocumentationModal();

/**
 * Export utility functions for global use
 */
window.SpaceTheme = {
    showToast,
    copyToClipboard,
    formatNumber,
    formatDate,
    showLoadingOverlay,
    hideLoadingOverlay,
    validateForm,
    createStarRating,
    handleImageError,
    smoothScrollTo,
    debounce
};
