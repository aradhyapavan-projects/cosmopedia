/* Performance Optimization & Lazy Loading */

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeAnimations();
        this.setupImageLoadingStates();
        this.optimizeScrollEvents();
        this.preloadCriticalAssets();
    }

    // Lazy Loading with Intersection Observer
    setupLazyLoading() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    // Add loading state
                    img.classList.add('loading');
                    
                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    
                    // Handle load completion
                    img.onload = () => {
                        img.classList.remove('loading');
                        img.classList.add('loaded');
                    };
                    
                    // Handle errors
                    img.onerror = () => {
                        img.classList.remove('loading');
                        img.classList.add('error');
                        // Set fallback image
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMWExYTJlIi8+CjxwYXRoIGQ9Ik0yMDAgMTAwQzIyMi4wOTEgMTAwIDI0MCA4Mi4wOTE0IDI0MCA2MEM2MCAzNy45MDg2IDIyMi4wOTEgMjAgMjAwIDIwQzE3Ny45MDkgMjAgMTYwIDM3LjkwODYgMTYwIDYwQzE2MCA4Mi4wOTE0IDE3Ny45MDkgMTAwIDIwMCAxMDBaIiBmaWxsPSIjNjY2NjY2Ii8+CjxyZWN0IHg9IjEwMCIgeT0iMTUwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiByeD0iMTAiIGZpbGw9IiM2NjY2NjYiLz4KPHJlY3QgeD0iMTMwIiB5PSIxOTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMTUiIHJ4PSI3LjUiIGZpbGw9IiM0NDQ0NDQiLz4KPC9zdmc+';
                    };
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Also setup for dynamically loaded images
        this.setupDynamicImageObserver(imageObserver);
    }

    setupDynamicImageObserver(observer) {
        // Watch for new images added to the DOM
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        const images = node.querySelectorAll ? node.querySelectorAll('img[data-src]') : [];
                        images.forEach(img => observer.observe(img));
                        
                        // If the node itself is an image
                        if (node.tagName === 'IMG' && node.hasAttribute('data-src')) {
                            observer.observe(node);
                        }
                    }
                });
            });
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Optimize animations using requestAnimationFrame
    optimizeAnimations() {
        let ticking = false;

        function updateAnimations() {
            // Batch DOM updates here
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        }

        // Throttle scroll events
        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Add loading states for images
    setupImageLoadingStates() {
        // Add CSS for loading states if not already present
        if (!document.getElementById('lazy-loading-styles')) {
            const style = document.createElement('style');
            style.id = 'lazy-loading-styles';
            style.textContent = `
                img.loading {
                    background: linear-gradient(90deg, #1a1a2e 25%, #2d2d4a 50%, #1a1a2e 75%);
                    background-size: 200% 100%;
                    animation: loading-shimmer 1.5s infinite;
                    min-height: 200px;
                }
                
                img.loaded {
                    animation: fadeIn 0.3s ease-in-out;
                }
                
                img.error {
                    background: #333;
                    color: #999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                }
                
                @keyframes loading-shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                .card-img-top {
                    transition: transform 0.3s ease;
                }
                
                .card:hover .card-img-top {
                    transform: scale(1.05);
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Optimize scroll events
    optimizeScrollEvents() {
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            // Clear existing timeout
            clearTimeout(scrollTimeout);
            
            // Set a new timeout
            scrollTimeout = setTimeout(() => {
                // Update scroll progress
                this.updateScrollProgress();
            }, 10);
        }, { passive: true });
    }

    updateScrollProgress() {
        const scrollProgress = document.getElementById('scrollProgress');
        if (scrollProgress) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = Math.min(scrollPercent, 100) + '%';
        }
    }

    // Preload critical assets
    preloadCriticalAssets() {
        const criticalAssets = [
            'static/css/space-theme.css',
            'static/js/space-theme.js'
        ];

        criticalAssets.forEach(asset => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = asset;
            link.as = asset.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    // Convert existing images to lazy loading
    static convertToLazyLoading() {
        document.querySelectorAll('img:not([data-src])').forEach(img => {
            if (img.src && !img.src.startsWith('data:')) {
                img.dataset.src = img.src;
                img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWExYTJlIi8+CjwvZXZnPg==';
                img.classList.add('lazy-load');
            }
        });
    }

    // Debounce function for performance
    static debounce(func, wait) {
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

    // Throttle function for performance
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize performance optimizations when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new PerformanceOptimizer();
    });
} else {
    new PerformanceOptimizer();
}

// Export for use in other scripts
window.PerformanceOptimizer = PerformanceOptimizer;
