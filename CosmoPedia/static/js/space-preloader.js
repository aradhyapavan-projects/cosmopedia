/* 
 * SLEEK SPACE PRELOADER
 * Clean, Modern, and Professional
 */

console.log('🚀 Loading Cosmopedia...');

class SleekSpacePreloader {
    constructor() {
        this.loadingProgress = 0;
        this.isDestroyed = false;
        this.animationId = null;
        
        this.messages = [
            "Initializing...",
            "Loading modules...",
            "Preparing interface...",
            "Almost ready...",
            "Welcome!"
        ];
        
        this.init();
    }

    init() {
        this.createContainer();
        this.startLoading();
        this.animate();
    }

    createContainer() {
        // Remove immediate preloader
        const immediatePreloader = document.getElementById('immediatePreloader');
        if (immediatePreloader) {
            immediatePreloader.remove();
        }

        // Remove any existing preloader
        const existing = document.getElementById('spacePreloader');
        if (existing) existing.remove();

        // Create clean, modern container
        this.container = document.createElement('div');
        this.container.id = 'spacePreloader';
        this.container.innerHTML = `
            <div class="preloader-content">
                <!-- Animated Background -->
                <div class="space-bg">
                    <div class="stars"></div>
                    <div class="shooting-star"></div>
                </div>
                
                <!-- Clean Logo and Text -->
                <div class="loader-center">
                    <div class="space-logo">
                        <div class="orbit-ring">
                            <div class="planet"></div>
                        </div>
                    </div>
                    <h1 class="space-title">COSMOPEDIA</h1>
                    <div class="loading-info">
                        <div class="status-text" id="statusText">Initializing...</div>
                        <div class="progress-bar">
                            <div class="progress-fill" id="progressFill"></div>
                        </div>
                        <div class="progress-percent" id="progressPercent">0%</div>
                    </div>
                </div>
            </div>
        `;

        // Clean, modern CSS
        const style = document.createElement('style');
        style.textContent = `
            #spacePreloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Space Grotesk', 'Arial', sans-serif;
                overflow: hidden;
            }

            .preloader-content {
                position: relative;
                text-align: center;
                z-index: 2;
            }

            .space-bg {
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
                    radial-gradient(2px 2px at 20px 30px, #eee, transparent),
                    radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
                    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                    radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
                    radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
                background-repeat: repeat;
                background-size: 200px 150px;
                animation: twinkle 3s ease-in-out infinite alternate;
            }

            .shooting-star {
                position: absolute;
                top: 20%;
                left: -100px;
                width: 2px;
                height: 2px;
                background: #fff;
                border-radius: 50%;
                box-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff;
                animation: shootingStar 8s linear infinite;
            }

            .loader-center {
                position: relative;
                z-index: 3;
            }

            .space-logo {
                position: relative;
                width: 120px;
                height: 120px;
                margin: 0 auto 40px auto;
            }

            .orbit-ring {
                position: relative;
                width: 100%;
                height: 100%;
                border: 2px solid rgba(0, 255, 255, 0.3);
                border-radius: 50%;
                animation: rotate 4s linear infinite;
            }

            .orbit-ring::before {
                content: '';
                position: absolute;
                top: -2px;
                left: 50%;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                box-shadow: 0 0 15px #00ffff;
                transform: translateX(-50%);
            }

            .planet {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, #4a90e2 0%, #357abd 100%);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                box-shadow: 
                    0 0 20px rgba(74, 144, 226, 0.5),
                    inset -10px -10px 20px rgba(0, 0, 0, 0.3);
                animation: pulse 2s ease-in-out infinite alternate;
            }

            .space-title {
                font-size: 3rem;
                font-weight: 700;
                color: #fff;
                margin: 0 0 30px 0;
                letter-spacing: 0.2rem;
                text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
                animation: glow 2s ease-in-out infinite alternate;
            }

            .loading-info {
                max-width: 400px;
                margin: 0 auto;
            }

            .status-text {
                font-size: 1.1rem;
                color: #00ffff;
                margin-bottom: 20px;
                font-weight: 400;
                text-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }

            .progress-bar {
                width: 100%;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 15px;
                position: relative;
            }

            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #00ffff, #ff0080);
                border-radius: 2px;
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }

            .progress-percent {
                font-size: 1rem;
                color: #fff;
                font-weight: 500;
            }

            /* Animations */
            @keyframes twinkle {
                0% { opacity: 0.3; }
                100% { opacity: 1; }
            }

            @keyframes shootingStar {
                0% { 
                    transform: translateX(-100px) translateY(0px); 
                    opacity: 0; 
                }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { 
                    transform: translateX(calc(100vw + 100px)) translateY(-200px); 
                    opacity: 0; 
                }
            }

            @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                100% { transform: translate(-50%, -50%) scale(1.1); }
            }

            @keyframes glow {
                0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
                100% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.3); }
            }

            @keyframes fadeOut {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.05); }
            }

            .preloader-exit {
                animation: fadeOut 0.8s ease-out forwards;
            }

            /* Responsive */
            @media (max-width: 768px) {
                .space-title {
                    font-size: 2.2rem;
                }
                .space-logo {
                    width: 100px;
                    height: 100px;
                }
            }

            @media (max-width: 480px) {
                .space-title {
                    font-size: 1.8rem;
                }
                .loading-info {
                    padding: 0 20px;
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(this.container);
        document.body.style.overflow = 'hidden';
    }

    generateStars(count) {
        let stars = '';
        for (let i = 0; i < count; i++) {
            const size = Math.random() * 3 + 1;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const type = Math.floor(Math.random() * 3) + 1;
            const delay = Math.random() * 3;
            
            stars += `
                <div class="star type-${type}" style="
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}%;
                    top: ${y}%;
                    animation-delay: ${delay}s;
                "></div>
            `;
        }
        return stars;
    }

    startDockingSequence() {
        let messageIndex = 0;
        const statusText = document.getElementById('statusText');
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');

        const updateMission = () => {
            if (this.isDestroyed) return;

            // Realistic loading progression
            this.loadingProgress += Math.random() * 3 + 1;

            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                statusText.textContent = this.spaceMessages[this.spaceMessages.length - 1];
                progressFill.style.width = '100%';
                progressPercent.textContent = '100%';
                
                // Mark as shown in session
                sessionStorage.setItem('spacePreloaderShown', 'true');
                
                setTimeout(() => {
                    if (!this.isDestroyed) {
                        this.completeMission();
                    }
                }, 1500);
                return;
            }

            // Update progress visuals
            progressFill.style.width = this.loadingProgress + '%';
            progressPercent.textContent = Math.floor(this.loadingProgress) + '%';

            // Update status message
            const expectedIndex = Math.floor((this.loadingProgress / 100) * (this.spaceMessages.length - 1));
            if (expectedIndex !== messageIndex && expectedIndex < this.spaceMessages.length - 1) {
                messageIndex = expectedIndex;
                statusText.textContent = this.spaceMessages[messageIndex];
            }

            setTimeout(updateMission, 120 + Math.random() * 80);
        };

        updateMission();
    }

    animateSpace() {
        const animate = () => {
            if (this.isDestroyed) return;
            this.animationId = requestAnimationFrame(animate);
            
            // Add any additional real-time animations here
        };
        animate();
    }

    completeMission() {
        this.isDestroyed = true;
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }

        // Exit animation
        this.container.classList.add('preloader-exit');

        setTimeout(() => {
            // Clean up
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }

            // Restore page functionality
            document.body.style.overflow = '';
            
            console.log('🌌 Space mission completed successfully!');
        }, 1000);
    }
}

// Initialize the Ultimate Space Preloader with session check
function initUltimateSpacePreloader() {
    console.log('🚀 Checking mission status...');
    
    // Check if preloader was already shown this session
    if (sessionStorage.getItem('spacePreloaderShown')) {
        console.log('⏭️ Mission already completed this session');
        // Remove immediate preloader if it exists
        const immediatePreloader = document.getElementById('immediatePreloader');
        if (immediatePreloader) {
            immediatePreloader.remove();
        }
        // Ensure page is interactive
        document.body.style.overflow = '';
        return;
    }
    
    console.log('🌌 Initiating space exploration mission...');
    new UltimateSpacePreloader();
}

// Start the space mission
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
    const preloader = document.getElementById('spacePreloader');
    if (preloader) preloader.remove();
    document.body.style.overflow = '';
};

// Ensure preloader doesn't interfere with page functionality
window.addEventListener('beforeunload', () => {
    const preloader = document.getElementById('spacePreloader');
    if (preloader) preloader.remove();
});

console.log('🌌 Ultimate Space Exploration Preloader ready for launch!');
