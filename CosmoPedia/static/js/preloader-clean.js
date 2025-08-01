/* 
 * ULTIMATE CREATIVE SPACE PRELOADER
 * Cinema-Quality, Visually Stunning, Session-Based
 */

console.log('🚀 Ultimate Space Preloader Loading...');

class UltimateSpacePreloader {
    constructor() {
        this.loadingProgress = 0;
        this.isDestroyed = false;
        this.animationId = null;
        this.particles = [];
        
        this.messages = [
            "Initializing Quantum Systems...",
            "Scanning Stellar Coordinates...",
            "Establishing Warp Field...",
            "Calibrating Navigation Array...",
            "Engaging Hyperdrive...",
            "Welcome to the Future!"
        ];
        
        this.init();
    }

    init() {
        this.createContainer();
        this.startLoadingSequence();
        this.animate();
    }

    createContainer() {
        // Remove immediate preloader first
        const immediatePreloader = document.getElementById('immediatePreloader');
        if (immediatePreloader) {
            immediatePreloader.remove();
        }

        // Remove any existing JS preloader
        const existing = document.getElementById('spacePreloader');
        if (existing) existing.remove();

        // Create ultra-modern, visually stunning container
        this.container = document.createElement('div');
        this.container.id = 'spacePreloader';
        this.container.innerHTML = `
            <div class="ultimate-space-container">
                <!-- Particle Background -->
                <div class="particle-field">
                    <canvas id="particleCanvas"></canvas>
                </div>
                
                <!-- Wormhole Portal -->
                <div class="wormhole-portal">
                    <div class="wormhole-ring ring-1"></div>
                    <div class="wormhole-ring ring-2"></div>
                    <div class="wormhole-ring ring-3"></div>
                    <div class="wormhole-ring ring-4"></div>
                    <div class="wormhole-core"></div>
                </div>
                
                <!-- Floating Space Station -->
                <div class="space-station-complex">
                    <div class="station-core">
                        <div class="core-ring"></div>
                        <div class="energy-field"></div>
                    </div>
                    <div class="solar-panels">
                        <div class="panel panel-left"></div>
                        <div class="panel panel-right"></div>
                    </div>
                    <div class="docking-lights">
                        <div class="light light-1"></div>
                        <div class="light light-2"></div>
                        <div class="light light-3"></div>
                    </div>
                </div>
                
                <!-- Holographic UI -->
                <div class="holographic-interface">
                    <div class="holo-title">
                        <span class="title-text">COSMOPEDIA</span>
                        <div class="title-underline"></div>
                    </div>
                    
                    <div class="mission-status">
                        <div class="status-indicator">
                            <div class="status-dot"></div>
                            <span class="status-label" id="statusLabel">Quantum Drive Active</span>
                        </div>
                    </div>
                    
                    <div class="progress-system">
                        <div class="progress-label">MISSION PROGRESS</div>
                        <div class="progress-container">
                            <div class="progress-track">
                                <div class="progress-fill" id="progressFill"></div>
                                <div class="progress-pulse"></div>
                            </div>
                            <div class="progress-percentage" id="progressPercent">0%</div>
                        </div>
                    </div>
                    
                    <div class="system-readout">
                        <div class="readout-item">
                            <span class="readout-label">NAV</span>
                            <span class="readout-status online">ONLINE</span>
                        </div>
                        <div class="readout-item">
                            <span class="readout-label">PWR</span>
                            <span class="readout-status optimal">OPTIMAL</span>
                        </div>
                        <div class="readout-item">
                            <span class="readout-label">COM</span>
                            <span class="readout-status active">ACTIVE</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // ...existing code...
        
        document.head.appendChild(style);
        document.body.appendChild(this.container);
        document.body.style.overflow = 'hidden';

        // Initialize particle system
        this.initParticles();
    }

    // ...existing code...
}

// Initialize Ultimate Space Preloader with session check
function initUltimateSpacePreloader() {
    console.log('🌌 Checking session status...');
    
    // Check if preloader was already shown this session
    if (sessionStorage.getItem('spacePreloaderShown')) {
        console.log('⏭️ Preloader already shown this session - skipping');
        return;
    }
    
    console.log('🚀 Launching Ultimate Space Experience...');
    new UltimateSpacePreloader();
}

// Start the ultimate space experience
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initUltimateSpacePreloader);
} else {
    initUltimateSpacePreloader();
}

// Development and testing functions
window.resetSpacePreloader = () => {
    sessionStorage.removeItem('spacePreloaderShown');
    location.reload();
};

window.clearSpacePreloader = () => {
    sessionStorage.clear();
    location.reload();
};

// Cleanup function
window.clearPreloader = () => {
    const preloader = document.getElementById('spacePreloader');
    if (preloader) {
        preloader.remove();
    }
    document.body.style.overflow = '';
};

console.log('🌟 Ultimate Space Preloader ready for launch!');

    createContainer() {
        // Remove immediate preloader first
        const immediatePreloader = document.getElementById('immediatePreloader');
        if (immediatePreloader) {
            immediatePreloader.remove();
        }

        // Remove any existing JS preloader
        const existing = document.getElementById('spacePreloader');
        if (existing) existing.remove();

        // Create sleek modern container
        this.container = document.createElement('div');
        this.container.id = 'spacePreloader';
        this.container.innerHTML = `
            <div class="preloader-bg">
                <div class="stars"></div>
                <div class="shooting-star"></div>
            </div>
            
            <div class="preloader-content">
                <div class="logo-container">
                    <div class="space-orb">
                        <div class="orb-core"></div>
                        <div class="orb-ring"></div>
                    </div>
                </div>
                
                <h1 class="site-title">COSMOPEDIA</h1>
                <p class="site-subtitle">Exploring the Final Frontier</p>
                
                <div class="loading-section">
                    <div class="progress-wrapper">
                        <div class="progress-track">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-text" id="progressText">0%</div>
                    </div>
                    <div class="status-text" id="statusText">Initializing...</div>
                </div>
            </div>
        `;

        // Clean, beautiful CSS
        const style = document.createElement('style');
        style.textContent = `
            #spacePreloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Segoe UI', 'Arial', sans-serif;
                overflow: hidden;
            }

            .preloader-bg {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .stars {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: 
                    radial-gradient(2px 2px at 20px 30px, #fff, transparent),
                    radial-gradient(1px 1px at 40px 70px, #fff, transparent),
                    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                    radial-gradient(1px 1px at 130px 80px, #fff, transparent);
                background-repeat: repeat;
                background-size: 250px 200px;
                animation: twinkle 4s ease-in-out infinite alternate;
                opacity: 0.7;
            }

            .shooting-star {
                position: absolute;
                top: 20%;
                left: -10px;
                width: 2px;
                height: 2px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 15px #fff;
                animation: shoot 6s linear infinite;
            }

            .preloader-content {
                text-align: center;
                z-index: 2;
                position: relative;
            }

            .logo-container {
                margin-bottom: 40px;
            }

            .space-orb {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }

            .orb-core {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 50px;
                height: 50px;
                background: radial-gradient(circle at 30% 30%, #4a90e2, #2c5aa0);
                border-radius: 50%;
                box-shadow: 
                    0 0 30px rgba(74, 144, 226, 0.6),
                    inset 0 0 20px rgba(255, 255, 255, 0.1);
                animation: orbPulse 3s ease-in-out infinite;
            }

            .orb-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 80px;
                border: 2px solid rgba(74, 144, 226, 0.4);
                border-top-color: rgba(74, 144, 226, 0.8);
                border-radius: 50%;
                animation: orbRotate 2s linear infinite;
            }

            .site-title {
                font-size: 3rem;
                font-weight: 300;
                color: #ffffff;
                margin: 0 0 10px 0;
                letter-spacing: 0.2rem;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
            }

            .site-subtitle {
                font-size: 1.1rem;
                color: #888;
                margin: 0 0 50px 0;
                font-weight: 300;
                letter-spacing: 0.1rem;
            }

            .loading-section {
                max-width: 400px;
                margin: 0 auto;
            }

            .progress-wrapper {
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 25px;
            }

            .progress-track {
                flex: 1;
                height: 3px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                position: relative;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #4a90e2, #74b9ff);
                border-radius: 2px;
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
            }

            .progress-text {
                font-size: 1rem;
                color: #4a90e2;
                font-weight: 500;
                min-width: 50px;
            }

            .status-text {
                font-size: 0.95rem;
                color: #bbb;
                font-weight: 300;
            }

            /* Animations */
            @keyframes twinkle {
                0% { opacity: 0.4; }
                100% { opacity: 0.8; }
            }

            @keyframes shoot {
                0% { 
                    transform: translateX(-10px) translateY(0px); 
                    opacity: 0; 
                }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { 
                    transform: translateX(calc(100vw + 10px)) translateY(-300px); 
                    opacity: 0; 
                }
            }

            @keyframes orbPulse {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(1); 
                    box-shadow: 0 0 30px rgba(74, 144, 226, 0.6); 
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.1); 
                    box-shadow: 0 0 40px rgba(74, 144, 226, 0.8); 
                }
            }

            @keyframes orbRotate {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }

            .preloader-exit {
                animation: fadeOut 0.8s ease-out forwards;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .site-title {
                    font-size: 2.2rem;
                }
                .loading-section {
                    padding: 0 30px;
                }
            }

            @media (max-width: 480px) {
                .site-title {
                    font-size: 1.8rem;
                }
                .space-orb {
                    width: 80px;
                    height: 80px;
                }
                .orb-core {
                    width: 40px;
                    height: 40px;
                }
                .orb-ring {
                    width: 65px;
                    height: 65px;
                }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(this.container);
        document.body.style.overflow = 'hidden';
    }

    startLoadingSequence() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const statusText = document.getElementById('statusText');
        
        const messages = [
            "Initializing...",
            "Loading modules...",
            "Connecting to servers...",
            "Preparing interface...",
            "Almost ready...",
            "Welcome!"
        ];

        const updateProgress = () => {
            if (this.isDestroyed) return;

            this.loadingProgress += Math.random() * 8 + 4;

            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                progressFill.style.width = '100%';
                progressText.textContent = '100%';
                statusText.textContent = messages[messages.length - 1];
                
                setTimeout(() => {
                    if (!this.isDestroyed) {
                        this.destroy();
                    }
                }, 800);
                return;
            }

            // Update progress smoothly
            progressFill.style.width = this.loadingProgress + '%';
            progressText.textContent = Math.floor(this.loadingProgress) + '%';
            
            // Update status message
            const messageIndex = Math.floor((this.loadingProgress / 100) * (messages.length - 1));
            statusText.textContent = messages[messageIndex] || messages[0];

            setTimeout(updateProgress, 100 + Math.random() * 150);
        };

        updateProgress();
    }

    destroy() {
        this.isDestroyed = true;

        // Clean exit animation
        this.container.classList.add('preloader-exit');

        setTimeout(() => {
            // Remove elements
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }

            // Restore page
            document.body.style.overflow = '';
            
            // Mark as shown for session
            sessionStorage.setItem('spacePreloaderShown', 'true');
            
            console.log('✨ Welcome to Cosmopedia!');
        }, 800);
    }
}

// Initialize function with session storage
function initSpacePreloader() {
    try {
        console.log('🚀 Starting Cosmopedia preloader...');
        
        // Check session storage (uncomment to enable once per session)
        // if (sessionStorage.getItem('spacePreloaderShown')) {
        //     console.log('⏭️ Preloader already shown this session');
        //     return;
        // }
        
        new ModernSpacePreloader();
        
    } catch (error) {
        console.error('Preloader error:', error);
        document.body.style.overflow = '';
    }
}

// Start the docking sequence
function safeStart() {
    try {
        initSpacePreloader();
    } catch (error) {
        console.error('Failed to start space station docking:', error);
        document.body.style.overflow = '';
    }
}

// Multiple start points for reliability
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', safeStart);
} else {
    safeStart();
}

// Emergency cleanup functions
window.clearSpacePreloader = () => {
    const preloader = document.getElementById('spacePreloader');
    if (preloader) preloader.remove();
    document.body.style.overflow = '';
    sessionStorage.clear();
};

window.clearPreloader = () => {
    window.clearSpacePreloader();
};

window.resetSpacePreloader = () => {
    sessionStorage.removeItem('spacePreloaderShown');
    location.reload();
};
