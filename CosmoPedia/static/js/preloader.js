/* 
 * CREATIVE SPACE STATION DOCKING PRELOADER
 * Realistic and immersive space experience
 */

console.log('🚀 Space Station Docking Preloader loaded!');

// Creative Space Station Docking Preloader
class SpaceStationPreloader {
    constructor() {
        this.loadingProgress = 0;
        this.isDestroyed = false;
        this.init();
    }

    init() {
        this.createContainer();
        this.startLoadingSequence();
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

        // Create main container
        this.container = document.createElement('div');
        this.container.id = 'spacePreloader';
        this.container.innerHTML = `
            <div class="space-scene">
                <div class="stars-field"></div>
                <div class="nebula-cloud"></div>
                <div class="space-station">
                    <div class="station-core"></div>
                    <div class="station-ring ring-1"></div>
                    <div class="station-ring ring-2"></div>
                    <div class="station-antenna"></div>
                    <div class="docking-bay"></div>
                </div>
                <div class="approaching-ship">
                    <div class="ship-body"></div>
                    <div class="ship-engines">
                        <div class="engine engine-1"></div>
                        <div class="engine engine-2"></div>
                    </div>
                    <div class="engine-trail"></div>
                </div>
                <div class="ui-overlay">
                    <div class="hud-frame">
                        <div class="hud-corner tl"></div>
                        <div class="hud-corner tr"></div>
                        <div class="hud-corner bl"></div>
                        <div class="hud-corner br"></div>
                    </div>
                    <div class="mission-info">
                        <div class="mission-title">COSMOPEDIA</div>
                        <div class="mission-subtitle">Deep Space Command Center</div>
                        <div class="docking-status">
                            <div class="status-label">DOCKING SEQUENCE</div>
                            <div class="progress-container">
                                <div class="progress-bar" id="dockingProgress"></div>
                                <div class="progress-glow"></div>
                            </div>
                            <div class="progress-percent" id="dockingPercent">0%</div>
                        </div>
                        <div class="system-status" id="systemStatus">Approaching Space Station...</div>
                    </div>
                    <div class="radar-display">
                        <div class="radar-circle">
                            <div class="radar-sweep"></div>
                            <div class="radar-blip station-blip"></div>
                            <div class="radar-blip ship-blip"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add creative space station styles
        const style = document.createElement('style');
        style.textContent = `
            #spacePreloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                z-index: 999999;
                overflow: hidden;
                font-family: 'Orbitron', 'Space Grotesk', monospace;
            }

            .space-scene {
                position: relative;
                width: 100%;
                height: 100%;
                perspective: 1000px;
            }

            .stars-field {
                position: absolute;
                width: 200%;
                height: 200%;
                top: -50%;
                left: -50%;
                background-image: 
                    radial-gradient(1px 1px at 20px 30px, #fff, transparent),
                    radial-gradient(1px 1px at 40px 70px, #fff, transparent),
                    radial-gradient(1px 1px at 90px 40px, #fff, transparent),
                    radial-gradient(1px 1px at 130px 80px, #fff, transparent),
                    radial-gradient(1px 1px at 160px 30px, #fff, transparent);
                background-repeat: repeat;
                background-size: 200px 100px;
                animation: starsMove 60s linear infinite;
                opacity: 0.8;
            }

            .nebula-cloud {
                position: absolute;
                top: 20%;
                right: 10%;
                width: 300px;
                height: 200px;
                background: radial-gradient(ellipse, 
                    rgba(138, 43, 226, 0.3) 0%, 
                    rgba(75, 0, 130, 0.2) 30%, 
                    rgba(0, 191, 255, 0.1) 60%, 
                    transparent 80%);
                border-radius: 50%;
                filter: blur(2px);
                animation: nebulaFloat 20s ease-in-out infinite;
            }

            .space-station {
                position: absolute;
                top: 50%;
                left: 75%;
                transform: translate(-50%, -50%);
                width: 200px;
                height: 200px;
            }

            .station-core {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 60px;
                height: 60px;
                background: linear-gradient(45deg, #333, #666);
                border-radius: 8px;
                box-shadow: 
                    0 0 20px rgba(0, 150, 255, 0.5),
                    inset 0 0 10px rgba(0, 100, 200, 0.3);
            }

            .station-ring {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border: 3px solid rgba(0, 150, 255, 0.7);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(0, 150, 255, 0.5);
            }

            .ring-1 {
                width: 120px;
                height: 120px;
                animation: stationRotate 15s linear infinite;
            }

            .ring-2 {
                width: 160px;
                height: 160px;
                animation: stationRotate 25s linear infinite reverse;
            }

            .station-antenna {
                position: absolute;
                top: 25%;
                left: 50%;
                transform: translateX(-50%);
                width: 2px;
                height: 40px;
                background: linear-gradient(to top, #444, #0096ff);
                box-shadow: 0 0 10px rgba(0, 150, 255, 0.8);
            }

            .docking-bay {
                position: absolute;
                bottom: 20%;
                left: 50%;
                transform: translateX(-50%);
                width: 30px;
                height: 15px;
                background: rgba(0, 255, 0, 0.3);
                border: 2px solid rgba(0, 255, 0, 0.8);
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.6);
                animation: dockingPulse 2s ease-in-out infinite;
            }

            .approaching-ship {
                position: absolute;
                top: 65%;
                left: 20%;
                transform: translate(-50%, -50%);
                width: 80px;
                height: 40px;
                animation: shipApproach 8s ease-in-out infinite;
            }

            .ship-body {
                position: absolute;
                top: 50%;
                left: 0;
                transform: translateY(-50%);
                width: 50px;
                height: 20px;
                background: linear-gradient(45deg, #555, #888);
                clip-path: polygon(0% 50%, 20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%);
                box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            }

            .ship-engines {
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
            }

            .engine {
                position: absolute;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #00ffff, #0080ff);
                border-radius: 50%;
                box-shadow: 0 0 15px rgba(0, 255, 255, 0.8);
                animation: enginePulse 0.5s ease-in-out infinite alternate;
            }

            .engine-1 { top: -8px; }
            .engine-2 { top: 4px; }

            .engine-trail {
                position: absolute;
                top: 50%;
                right: -20px;
                transform: translateY(-50%);
                width: 30px;
                height: 4px;
                background: linear-gradient(to right, rgba(0, 255, 255, 0.8), transparent);
                border-radius: 50px;
                animation: trailFlicker 0.3s ease-in-out infinite;
            }

            .ui-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .hud-frame {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .hud-corner {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 2px solid rgba(0, 255, 255, 0.8);
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            }

            .tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
            .tr { top: 20px; right: 20px; border-left: none; border-bottom: none; }
            .bl { bottom: 20px; left: 20px; border-right: none; border-top: none; }
            .br { bottom: 20px; right: 20px; border-left: none; border-top: none; }

            .mission-info {
                position: absolute;
                top: 50px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
                color: #fff;
            }

            .mission-title {
                font-size: 2.5rem;
                font-weight: 700;
                color: #00ffff;
                text-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
                margin-bottom: 0.5rem;
                letter-spacing: 0.2rem;
                animation: titleGlow 3s ease-in-out infinite alternate;
            }

            .mission-subtitle {
                font-size: 1rem;
                color: #aaa;
                margin-bottom: 2rem;
                letter-spacing: 0.1rem;
            }

            .docking-status {
                margin-bottom: 1rem;
            }

            .status-label {
                font-size: 0.9rem;
                color: #00ff00;
                margin-bottom: 1rem;
                text-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
            }

            .progress-container {
                position: relative;
                width: 300px;
                height: 6px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
                margin: 0 auto 1rem auto;
                overflow: hidden;
            }

            .progress-bar {
                height: 100%;
                background: linear-gradient(90deg, #00ffff, #00ff00);
                border-radius: 3px;
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
            }

            .progress-glow {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 20px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 3px;
                animation: progressSweep 2s ease-in-out infinite;
            }

            .progress-percent {
                font-size: 1.2rem;
                color: #00ffff;
                font-weight: bold;
                margin-bottom: 1rem;
            }

            .system-status {
                font-size: 0.9rem;
                color: #ffffff;
                opacity: 0.8;
            }

            .radar-display {
                position: absolute;
                bottom: 50px;
                right: 50px;
                width: 120px;
                height: 120px;
            }

            .radar-circle {
                position: relative;
                width: 100%;
                height: 100%;
                border: 2px solid rgba(0, 255, 0, 0.5);
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0, 255, 0, 0.1), transparent 70%);
            }

            .radar-sweep {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 2px;
                height: 50%;
                background: linear-gradient(to top, rgba(0, 255, 0, 0.8), transparent);
                transform-origin: bottom center;
                animation: radarSweep 3s linear infinite;
            }

            .radar-blip {
                position: absolute;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                animation: blipPulse 2s ease-in-out infinite;
            }

            .station-blip {
                top: 30%;
                right: 20%;
                background: rgba(0, 150, 255, 0.8);
                box-shadow: 0 0 10px rgba(0, 150, 255, 0.6);
            }

            .ship-blip {
                bottom: 25%;
                left: 25%;
                background: rgba(255, 255, 0, 0.8);
                box-shadow: 0 0 10px rgba(255, 255, 0, 0.6);
            }

            /* Animations */
            @keyframes starsMove {
                0% { transform: translate(0, 0); }
                100% { transform: translate(-100px, -50px); }
            }

            @keyframes nebulaFloat {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(20px, -10px) scale(1.1); }
            }

            @keyframes stationRotate {
                0% { transform: translate(-50%, -50%) rotate(0deg); }
                100% { transform: translate(-50%, -50%) rotate(360deg); }
            }

            @keyframes dockingPulse {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }

            @keyframes shipApproach {
                0% { transform: translate(-50%, -50%) scale(0.8); }
                50% { transform: translate(-40%, -45%) scale(1); }
                100% { transform: translate(-50%, -50%) scale(0.8); }
            }

            @keyframes enginePulse {
                0% { transform: scale(1); opacity: 1; }
                100% { transform: scale(1.3); opacity: 0.7; }
            }

            @keyframes trailFlicker {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 0.4; }
            }

            @keyframes titleGlow {
                0% { text-shadow: 0 0 20px rgba(0, 255, 255, 0.8); }
                100% { text-shadow: 0 0 30px rgba(0, 255, 255, 1), 0 0 40px rgba(0, 255, 255, 0.5); }
            }

            @keyframes progressSweep {
                0% { left: -20px; }
                100% { left: 100%; }
            }

            @keyframes radarSweep {
                0% { transform: translate(-50%, 0) rotate(0deg); }
                100% { transform: translate(-50%, 0) rotate(360deg); }
            }

            @keyframes blipPulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
            }

            .space-exit {
                animation: spaceExit 1s ease-out forwards;
            }

            @keyframes spaceExit {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.1); }
            }

            @media (max-width: 768px) {
                .mission-title { font-size: 2rem; }
                .progress-container { width: 250px; }
                .radar-display { bottom: 30px; right: 30px; width: 100px; height: 100px; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(this.container);
        document.body.style.overflow = 'hidden';
    }

    startLoadingSequence() {
        const progressBar = document.getElementById('dockingProgress');
        const percentText = document.getElementById('dockingPercent');
        const statusText = document.getElementById('systemStatus');
        
        const messages = [
            "Approaching Space Station...",
            "Requesting Docking Permission...",
            "Permission Granted - Bay 7",
            "Aligning Docking Trajectory...",
            "Reducing Approach Velocity...",
            "Engaging Magnetic Clamps...",
            "Docking Sequence Complete!",
            "Welcome to Cosmopedia"
        ];

        const updateProgress = () => {
            if (this.isDestroyed) return;

            this.loadingProgress += Math.random() * 6 + 3;

            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                progressBar.style.width = '100%';
                percentText.textContent = '100%';
                statusText.textContent = messages[messages.length - 1];
                
                setTimeout(() => {
                    if (!this.isDestroyed) {
                        this.destroy();
                    }
                }, 1200);
                return;
            }

            // Update progress
            progressBar.style.width = this.loadingProgress + '%';
            percentText.textContent = Math.floor(this.loadingProgress) + '%';
            
            // Update message based on progress
            const messageIndex = Math.floor((this.loadingProgress / 100) * (messages.length - 1));
            statusText.textContent = messages[messageIndex] || messages[0];

            setTimeout(updateProgress, 120 + Math.random() * 80);
        };

        updateProgress();
    }

    destroy() {
        this.isDestroyed = true;

        // Add exit animation
        this.container.classList.add('space-exit');

        setTimeout(() => {
            // Remove DOM elements
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }

            // Restore page
            document.body.style.overflow = '';
            
            console.log('🚀 Space Station Docking Complete!');
        }, 1000);
    }
}

// Initialize function with error handling
function initSpacePreloader() {
    try {
        console.log('🚀 Initiating Space Station Docking Sequence...');
        
        // For testing, always show (uncomment for session storage)
        // if (sessionStorage.getItem('spacePreloaderShown')) {
        //     console.log('⏭️ Preloader already shown this session');
        //     return;
        // }
        
        new SpaceStationPreloader();
        // sessionStorage.setItem('spacePreloaderShown', 'true');
        
    } catch (error) {
        console.error('Preloader error:', error);
        document.body.style.overflow = '';
    }
}

// Start immediately with safety checks
function safeStart() {
    try {
        initSpacePreloader();
    } catch (error) {
        console.error('Failed to start preloader:', error);
        // Ensure page is usable even if preloader fails
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

class CinemaSpacePreloader {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.spaceship = null;
        this.planets = [];
        this.particles = [];
        this.nebula = null;
        this.blackhole = null;
        this.comet = null;
        this.engineTrails = [];
        this.loadingProgress = 0;
        this.animationId = null;
        this.isDestroyed = false;
        
        this.loadingMessages = [
            "Initializing Quantum Drive...",
            "Scanning Deep Space...",
            "Aligning Stellar Coordinates...",
            "Charging Warp Core...",
            "Calculating Trajectory...",
            "Engaging Hyperdrive...",
            "Reality Matrix Stabilized!",
            "Jump Complete!"
        ];
        
        this.init();
    }

    init() {
        this.createContainer();
        this.initThreeJS();
        this.createEnvironment();
        this.createSpaceship();
        this.createPlanets();
        this.createComet();
        this.createBlackhole();
        this.createParticleField();
        this.startLoadingSequence();
        this.animate();
    }

    createContainer() {
        // Remove any existing preloader
        const existing = document.getElementById('ultimateSpacePreloader');
        if (existing) existing.remove();

        // Create main container
        this.container = document.createElement('div');
        this.container.id = 'ultimateSpacePreloader';
        this.container.innerHTML = `
            <div class="preloader-canvas"></div>
            <div class="preloader-overlay">
                <div class="loading-interface">
                    <div class="hologram-title">COSMOPEDIA</div>
                    <div class="scan-lines"></div>
                    <div class="status-display">
                        <div class="status-message" id="statusMessage">Initializing Quantum Drive...</div>
                        <div class="progress-hologram">
                            <div class="progress-core" id="progressCore"></div>
                            <div class="progress-rings">
                                <div class="ring ring1"></div>
                                <div class="ring ring2"></div>
                                <div class="ring ring3"></div>
                            </div>
                        </div>
                        <div class="progress-percent" id="progressPercent">0%</div>
                    </div>
                    <div class="quantum-particles">
                        ${Array.from({length: 30}, () => '<div class="quantum-dot"></div>').join('')}
                    </div>
                </div>
            </div>
        `;

        // Add ultimate styles
        const style = document.createElement('style');
        style.textContent = `
            #ultimateSpacePreloader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000000;
                z-index: 999999;
                overflow: hidden;
                font-family: 'Orbitron', 'Space Grotesk', monospace;
            }

            .preloader-canvas {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .preloader-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at center, rgba(0,20,40,0.3) 0%, rgba(0,0,0,0.8) 70%);
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .loading-interface {
                text-align: center;
                position: relative;
                z-index: 10;
            }

            .hologram-title {
                font-size: 4rem;
                font-weight: 700;
                color: #00ffff;
                text-shadow: 
                    0 0 10px #00ffff,
                    0 0 20px #00ffff,
                    0 0 40px #00ffff,
                    0 0 80px #00ffff;
                margin-bottom: 3rem;
                letter-spacing: 0.5rem;
                animation: hologramFlicker 3s ease-in-out infinite;
                position: relative;
                background: linear-gradient(45deg, #00ffff, #ff0080, #00ff80, #ffff00);
                background-size: 400% 400%;
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                animation: hologramFlicker 3s ease-in-out infinite, gradientShift 8s ease-in-out infinite;
            }

            .hologram-title::before {
                content: attr(data-text);
                position: absolute;
                top: 0;
                left: 0;
                color: #ff0080;
                z-index: -1;
                animation: hologramGlitch 5s infinite;
            }

            .scan-lines {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,255,255,0.03) 2px,
                    rgba(0,255,255,0.03) 4px
                );
                animation: scanMove 2s linear infinite;
                pointer-events: none;
            }

            .status-display {
                margin-bottom: 2rem;
            }

            .status-message {
                font-size: 1.5rem;
                color: #00ccff;
                margin-bottom: 3rem;
                text-shadow: 0 0 10px rgba(0,204,255,0.5);
                animation: statusPulse 2s ease-in-out infinite;
            }

            .progress-hologram {
                position: relative;
                width: 200px;
                height: 200px;
                margin: 0 auto 2rem auto;
            }

            .progress-core {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 80px;
                height: 80px;
                transform: translate(-50%, -50%);
                border: 3px solid #00ffff;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%);
                box-shadow: 
                    0 0 20px #00ffff,
                    inset 0 0 20px rgba(0,255,255,0.1);
                animation: coreEnergy 2s ease-in-out infinite;
            }

            .progress-rings {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }

            .ring {
                position: absolute;
                border: 2px solid transparent;
                border-radius: 50%;
                animation: ringRotate 3s linear infinite;
            }

            .ring1 {
                top: 10px;
                left: 10px;
                right: 10px;
                bottom: 10px;
                border-top-color: #ff0080;
                border-right-color: #ff0080;
                animation-duration: 2s;
                box-shadow: 0 0 15px rgba(255,0,128,0.5);
            }

            .ring2 {
                top: 25px;
                left: 25px;
                right: 25px;
                bottom: 25px;
                border-bottom-color: #00ff80;
                border-left-color: #00ff80;
                animation-duration: 3s;
                animation-direction: reverse;
                box-shadow: 0 0 15px rgba(0,255,128,0.5);
            }

            .ring3 {
                top: 40px;
                left: 40px;
                right: 40px;
                bottom: 40px;
                border-top-color: #ffff00;
                border-bottom-color: #ffff00;
                animation-duration: 4s;
                box-shadow: 0 0 15px rgba(255,255,0,0.5);
            }

            .progress-percent {
                font-size: 2rem;
                font-weight: bold;
                color: #00ffff;
                text-shadow: 0 0 20px #00ffff;
                animation: percentGlow 1s ease-in-out infinite alternate;
            }

            .quantum-particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
            }

            .quantum-dot {
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                box-shadow: 0 0 10px #00ffff;
                animation: quantumFloat 6s linear infinite;
            }

            .quantum-dot:nth-child(even) {
                background: #ff0080;
                box-shadow: 0 0 10px #ff0080;
                animation-duration: 8s;
            }

            .quantum-dot:nth-child(3n) {
                background: #00ff80;
                box-shadow: 0 0 10px #00ff80;
                animation-duration: 7s;
            }

            @keyframes hologramFlicker {
                0%, 100% { opacity: 1; }
                5% { opacity: 0.8; }
                10% { opacity: 1; }
                15% { opacity: 0.9; }
                20% { opacity: 1; }
            }

            @keyframes hologramGlitch {
                0%, 90%, 100% { transform: translate(0); }
                10% { transform: translate(-2px, 1px); }
                20% { transform: translate(1px, -1px); }
                30% { transform: translate(-1px, 1px); }
            }

            @keyframes scanMove {
                0% { transform: translateY(-100vh); }
                100% { transform: translateY(100vh); }
            }

            @keyframes statusPulse {
                0%, 100% { opacity: 0.8; }
                50% { opacity: 1; }
            }

            @keyframes coreEnergy {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
            }

            @keyframes ringRotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }

            @keyframes percentGlow {
                0% { text-shadow: 0 0 20px #00ffff; }
                100% { text-shadow: 0 0 30px #00ffff, 0 0 40px #00ffff; }
            }

            @keyframes quantumFloat {
                0% {
                    transform: translate(0, 100vh) scale(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                    transform: scale(1);
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translate(${Math.random() * 200 - 100}px, -100vh) scale(0);
                    opacity: 0;
                }
            }

            @keyframes ultimateExit {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.2); }
            }

            @keyframes gradientShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }

            @keyframes ultimateExit {
                0% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(1.2); }
            }

            .preloader-exit {
                animation: ultimateExit 1s ease-out forwards;
            }

            @media (max-width: 768px) {
                .hologram-title { font-size: 2.5rem; }
                .progress-hologram { width: 150px; height: 150px; }
            } particles = this.container.querySelectorAll('.quantum-dot');
        particles.forEach((particle, index) => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (index * 0.2) + 's';
        });

        document.body.appendChild(this.container);
        document.body.style.overflow = 'hidden';
    }

    initThreeJS() {
        const canvas = document.createElement('canvas');
        this.container.querySelector('.preloader-canvas').appendChild(canvas);

        // Scene
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x000011, 0.0003);

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 20, 100);

        // Renderer with enhanced settings
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: canvas, 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Enhanced lighting system
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Main light
        const mainLight = new THREE.DirectionalLight(0x00aaff, 1.5);
        mainLight.position.set(50, 50, 50);
        mainLight.castShadow = true;
        mainLight.shadow.mapSize.width = 2048;
        mainLight.shadow.mapSize.height = 2048;
        this.scene.add(mainLight);

        // Accent lights
        const light1 = new THREE.PointLight(0xff0080, 2, 100);
        light1.position.set(-50, 20, 30);
        this.scene.add(light1);

        const light2 = new THREE.PointLight(0x00ff80, 1.5, 80);
        light2.position.set(50, -20, -30);
        this.scene.add(light2);

        const light3 = new THREE.PointLight(0xffff00, 1, 60);
        light3.position.set(0, 50, -50);
        this.scene.add(light3);
    }

    createEnvironment() {
        // Create massive starfield
        const starGeometry = new THREE.BufferGeometry();
        const starCount = 5000;
        const positions = [];
        const colors = [];

        for (let i = 0; i < starCount; i++) {
            positions.push(
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800,
                (Math.random() - 0.5) * 800
            );

            // Different colored stars
            const colorChoice = Math.random();
            if (colorChoice < 0.7) {
                colors.push(1, 1, 1); // White
            } else if (colorChoice < 0.85) {
                colors.push(0.8, 0.8, 1); // Blue
            } else {
                colors.push(1, 0.8, 0.6); // Orange
            }
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

        const starMaterial = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);

        // Create nebula clouds
        for (let i = 0; i < 8; i++) {
            const nebulaGeometry = new THREE.SphereGeometry(25, 16, 16);
            const nebulaMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(Math.random(), 0.8, 0.3),
                transparent: true,
                opacity: 0.1,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending
            });

            const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial);
            nebula.position.set(
                (Math.random() - 0.5) * 400,
                (Math.random() - 0.5) * 200,
                (Math.random() - 0.5) * 400
            );
            nebula.scale.set(
                1 + Math.random() * 2,
                0.5 + Math.random(),
                1 + Math.random() * 2
            );

            this.scene.add(nebula);
        }
    }

    createSpaceship() {
        const spaceshipGroup = new THREE.Group();

        // Main fuselage - sleek design
        const fuselageGeometry = new THREE.CylinderGeometry(0.8, 2.5, 12, 16);
        const fuselageMaterial = new THREE.MeshPhongMaterial({
            color: 0x4A90E2,
            shininess: 150,
            specular: 0x111111
        });
        const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
        fuselage.rotation.z = Math.PI / 2;
        fuselage.castShadow = true;
        spaceshipGroup.add(fuselage);

        // Wings - more realistic
        const wingGeometry = new THREE.BoxGeometry(8, 0.5, 3);
        const wingMaterial = new THREE.MeshPhongMaterial({
            color: 0x7B68EE,
            shininess: 100
        });

        const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
        leftWing.position.set(-3, 3, 0);
        leftWing.rotation.z = -0.2;
        leftWing.castShadow = true;
        spaceshipGroup.add(leftWing);

        const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
        rightWing.position.set(-3, -3, 0);
        rightWing.rotation.z = 0.2;
        rightWing.castShadow = true;
        spaceshipGroup.add(rightWing);

        // Engine clusters with glow
        for (let i = 0; i < 4; i++) {
            const engineGeometry = new THREE.CylinderGeometry(0.3, 0.5, 2, 8);
            const engineMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.9
            });
            const engine = new THREE.Mesh(engineGeometry, engineMaterial);
            
            const angle = (i / 4) * Math.PI * 2;
            engine.position.set(
                5,
                Math.cos(angle) * 1.5,
                Math.sin(angle) * 1.5
            );
            engine.rotation.z = Math.PI / 2;
            spaceshipGroup.add(engine);

            // Engine glow effect
            const glowGeometry = new THREE.SphereGeometry(0.8, 8, 8);
            const glowMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ffff,
                transparent: true,
                opacity: 0.3,
                blending: THREE.AdditiveBlending
            });
            const glow = new THREE.Mesh(glowGeometry, glowMaterial);
            glow.position.copy(engine.position);
            glow.position.x += 1;
            spaceshipGroup.add(glow);
        }

        spaceshipGroup.position.set(-80, 10, 20);
        spaceshipGroup.scale.set(1.5, 1.5, 1.5);
        this.spaceship = spaceshipGroup;
        this.scene.add(this.spaceship);
    }

    createPlanets() {
        // Create several planets with different characteristics
        const planetData = [
            { radius: 8, color: 0x4169E1, distance: 120, speed: 0.005, name: 'earth' },
            { radius: 6, color: 0xff6b47, distance: 180, speed: 0.003, name: 'mars' },
            { radius: 12, color: 0xFFD700, distance: 250, speed: 0.002, name: 'saturn' },
            { radius: 10, color: 0xFF4500, distance: 320, speed: 0.001, name: 'jupiter' }
        ];

        planetData.forEach((data, index) => {
            const planetGroup = new THREE.Group();
            
            // Main planet
            const planetGeometry = new THREE.SphereGeometry(data.radius, 32, 32);
            const planetMaterial = new THREE.MeshPhongMaterial({
                color: data.color,
                shininess: 30,
                transparent: true,
                opacity: 0.9
            });
            
            const planet = new THREE.Mesh(planetGeometry, planetMaterial);
            planet.castShadow = true;
            planet.receiveShadow = true;
            planetGroup.add(planet);
            
            // Add atmosphere
            const atmosphereGeometry = new THREE.SphereGeometry(data.radius * 1.15, 32, 32);
            const atmosphereMaterial = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.15,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending
            });
            const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
            planetGroup.add(atmosphere);

            // Special features for specific planets
            if (data.name === 'saturn') {
                // Add Saturn's rings
                for (let i = 0; i < 4; i++) {
                    const ringGeometry = new THREE.RingGeometry(data.radius * (1.5 + i * 0.3), data.radius * (1.7 + i * 0.3), 64);
                    const ringMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color().setHSL(0.1 + i * 0.05, 0.8, 0.6),
                        transparent: true,
                        opacity: 0.7 - i * 0.1,
                        side: THREE.DoubleSide
                    });
                    
                    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
                    ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.1;
                    planetGroup.add(ring);
                }
            }

            if (data.name === 'earth') {
                // Add Earth's moon
                const moonGeometry = new THREE.SphereGeometry(data.radius * 0.25, 16, 16);
                const moonMaterial = new THREE.MeshPhongMaterial({
                    color: 0xaaaaaa,
                    shininess: 5
                });
                const moon = new THREE.Mesh(moonGeometry, moonMaterial);
                moon.position.set(data.radius * 2, 0, 0);
                planetGroup.add(moon);
            }

            planetGroup.position.set(data.distance, Math.random() * 40 - 20, Math.random() * 40 - 20);
            this.planets.push({ mesh: planetGroup, speed: data.speed, distance: data.distance });
            this.scene.add(planetGroup);
        });
    }

    createComet() {
        const cometGroup = new THREE.Group();

        // Comet nucleus
        const nucleusGeometry = new THREE.SphereGeometry(2, 16, 16);
        const nucleusMaterial = new THREE.MeshPhongMaterial({
            color: 0xaaaaaa,
            shininess: 10
        });
        const nucleus = new THREE.Mesh(nucleusGeometry, nucleusMaterial);
        nucleus.castShadow = true;
        cometGroup.add(nucleus);

        // Comet coma (fuzzy atmosphere)
        const comaGeometry = new THREE.SphereGeometry(8, 16, 16);
        const comaMaterial = new THREE.MeshBasicMaterial({
            color: 0x00aaff,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending
        });
        const coma = new THREE.Mesh(comaGeometry, comaMaterial);
        cometGroup.add(coma);

        // Comet tail - create multiple segments
        for (let i = 0; i < 20; i++) {
            const tailGeometry = new THREE.SphereGeometry(1 + i * 0.5, 8, 8);
            const tailMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.6, 0.8, 0.8),
                transparent: true,
                opacity: 0.3 - i * 0.01,
                blending: THREE.AdditiveBlending
            });
            
            const tailSegment = new THREE.Mesh(tailGeometry, tailMaterial);
            tailSegment.position.set(-i * 3, Math.sin(i * 0.5) * 2, Math.cos(i * 0.3) * 1);
        cometGroup.position.set(-200, 50, -100);
        this.comet = cometGroup;
        this.scene.add(this.comet);
    }   this.scene.add(this.comet);
    }       this.scene.add(planetGroup);
        });
    }

    createBlackhole() {
        const blackholeGroup = new THREE.Group();

        // Event horizon
        const horizonGeometry = new THREE.SphereGeometry(15, 32, 32);
        const horizonMaterial = new THREE.MeshBasicMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.9
        });
        const horizon = new THREE.Mesh(horizonGeometry, horizonMaterial);
        blackholeGroup.add(horizon);

        // Accretion disk
        for (let i = 0; i < 5; i++) {
            const ringGeometry = new THREE.TorusGeometry(20 + i * 8, 2, 8, 64);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setHSL(0.1 + i * 0.1, 1, 0.5),
                transparent: true,
                opacity: 0.6 - i * 0.1,
                blending: THREE.AdditiveBlending
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + Math.random() * 0.2;
            blackholeGroup.add(ring);
        }

        blackholeGroup.position.set(200, -100, -200);
        this.blackhole = blackholeGroup;
        this.scene.add(this.blackhole);
    }

    createParticleField() {
        // Create multiple particle systems
        for (let system = 0; system < 4; system++) {
            const particleCount = 1500;
            const geometry = new THREE.BufferGeometry();
            const positions = [];
            const colors = [];
            const velocities = [];

            for (let i = 0; i < particleCount; i++) {
                positions.push(
                    (Math.random() - 0.5) * 600,
                    (Math.random() - 0.5) * 300,
                    (Math.random() - 0.5) * 600
                );

                // Different particle colors per system
                if (system === 0) {
                    colors.push(0, 1, 1); // Cyan
                } else if (system === 1) {
                    colors.push(1, 0, 0.5); // Magenta
                } else if (system === 2) {
                    colors.push(0, 1, 0.5); // Green
                } else {
                    colors.push(1, 1, 0); // Yellow
                }

                velocities.push(
                    (Math.random() - 0.5) * 0.3,
                    (Math.random() - 0.5) * 0.2,
                    (Math.random() - 0.5) * 0.3
                );
            }

            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            geometry.setAttribute('velocity', new THREE.Float32BufferAttribute(velocities, 3));

            const material = new THREE.PointsMaterial({
                size: 1.5 + system * 0.5,
                vertexColors: true,
                transparent: true,
                opacity: 0.7,
                blending: THREE.AdditiveBlending
            });

            const particles = new THREE.Points(geometry, material);
            this.particles.push(particles);
            this.scene.add(particles);
        }
    }

    startLoadingSequence() {
        let messageIndex = 0;
        const messageElement = document.getElementById('statusMessage');
        const progressCore = document.getElementById('progressCore');
        const progressPercent = document.getElementById('progressPercent');

        const updateProgress = () => {
            if (this.isDestroyed) return;

            this.loadingProgress += Math.random() * 4 + 2;

            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
            if (this.loadingProgress >= 100) {
                this.loadingProgress = 100;
                messageElement.textContent = this.loadingMessages[this.loadingMessages.length - 1];
                progressPercent.textContent = '100%';
                
                setTimeout(() => {
                    if (!this.isDestroyed) {
                        this.destroy();
                    }
                }, 1500);
                return;
            }

            // Update progress core intensity
            const intensity = this.loadingProgress / 100;
            progressCore.style.boxShadow = 
                `0 0 ${20 + intensity * 30}px #00ffff, inset 0 0 ${20 + intensity * 20}px rgba(0,255,255,${0.1 + intensity * 0.3})`;
            progressPercent.textContent = Math.floor(this.loadingProgress) + '%';

            // Update message
            const expectedIndex = Math.floor((this.loadingProgress / 100) * (this.loadingMessages.length - 1));
            if (expectedIndex !== messageIndex && expectedIndex < this.loadingMessages.length - 1) {
                messageIndex = expectedIndex;
                messageElement.textContent = this.loadingMessages[messageIndex];
            }

            // Update message
            const expectedIndex = Math.floor((this.loadingProgress / 100) * (this.loadingMessages.length - 1));
            if (expectedIndex !== messageIndex && expectedIndex < this.loadingMessages.length - 1) {
                messageIndex = expectedIndex;
                messageElement.textContent = this.loadingMessages[messageIndex];
            } time = Date.now() * 0.001;

        // Rotate stars
        if (this.stars) {
            this.stars.rotation.y += 0.002;
        }

        // Animate spaceship
        if (this.spaceship) {
            this.spaceship.position.y = Math.sin(time * 2) * 0.5;
            this.spaceship.rotation.z = Math.sin(time) * 0.1;
        }

        // Animate planets in orbital motion
        this.planets.forEach((planetObj) => {
            planetObj.mesh.rotation.y += planetObj.speed * 2; // Planet rotation
            
            // Orbital motion around center
            const orbitSpeed = planetObj.speed * 0.5;
            const angle = time * orbitSpeed;
    animate() {
        if (this.isDestroyed) return;

        this.animationId = requestAnimationFrame(() => this.animate());

        const time = Date.now() * 0.001;

        // Animate twinkling stars
        if (this.stars) {
            this.stars.rotation.y += 0.001;
            this.stars.rotation.x += 0.0005;
            
            // Animate star opacity for twinkling effect
            const starMaterial = this.stars.material;
            starMaterial.opacity = 0.8 + Math.sin(time * 2) * 0.2;
        }

        // Animate spaceship with enhanced effects
        if (this.spaceship) {
            this.spaceship.position.y = 10 + Math.sin(time * 2) * 2;
            this.spaceship.position.x = -80 + Math.sin(time * 0.5) * 10;
            this.spaceship.rotation.z = Math.sin(time) * 0.1;
            this.spaceship.rotation.y = Math.sin(time * 0.3) * 0.05;
            
            // Animate engine glows
            this.spaceship.children.forEach((child) => {
                if (child.material && child.material.color && child.material.color.r === 0) {
                    // This is an engine glow
                    child.material.opacity = 0.3 + Math.sin(time * 10) * 0.2;
                    child.scale.setScalar(0.8 + Math.sin(time * 8) * 0.3);
                }
            });
        }

        // Animate planets in orbital motion
        this.planets.forEach((planetObj) => {
            planetObj.mesh.rotation.y += planetObj.speed * 2; // Planet rotation
            
            // Orbital motion around center
            const orbitSpeed = planetObj.speed * 0.5;
            const angle = time * orbitSpeed;
            planetObj.mesh.position.x = Math.cos(angle) * planetObj.distance;
            planetObj.mesh.position.z = Math.sin(angle) * planetObj.distance;
            
            // Slight vertical oscillation
            planetObj.mesh.position.y += Math.sin(time * planetObj.speed * 20) * 0.2;
        });

        // Animate comet
        if (this.comet) {
            // Comet follows an elliptical path
            const cometSpeed = time * 0.3;
            this.comet.position.x = -200 + Math.cos(cometSpeed) * 150;
            this.comet.position.y = 50 + Math.sin(cometSpeed * 0.7) * 30;
            this.comet.position.z = -100 + Math.sin(cometSpeed) * 80;
            
            // Rotate comet slowly
            this.comet.rotation.y += 0.01;
            
            // Animate tail segments
            this.comet.children.forEach((child, index) => {
                if (index > 1) { // Skip nucleus and coma
                    child.position.y += Math.sin(time * 3 + index) * 0.1;
                    child.scale.setScalar(0.8 + Math.sin(time * 2 + index) * 0.2);
                }
            });
        }

        // Animate blackhole
        if (this.blackhole) {
            this.blackhole.rotation.y += 0.005;
            this.blackhole.children.forEach((ring, index) => {
                if (index > 0) { // Skip the event horizon
                    ring.rotation.z += 0.01 * (index + 1);
                }
            });
        }

        // Animate particles
        this.particles.forEach((particleSystem) => {
            const positions = particleSystem.geometry.attributes.position.array;
            const velocities = particleSystem.geometry.attributes.velocity.array;
            
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += velocities[i];
                positions[i + 1] += velocities[i + 1];
                positions[i + 2] += velocities[i + 2];
                
                // Reset particles that go too far
                if (Math.abs(positions[i]) > 300 || Math.abs(positions[i + 1]) > 150 || Math.abs(positions[i + 2]) > 300) {
                    positions[i] = (Math.random() - 0.5) * 600;
                    positions[i + 1] = (Math.random() - 0.5) * 300;
                    positions[i + 2] = (Math.random() - 0.5) * 600;
                }
            }
            
            particleSystem.geometry.attributes.position.needsUpdate = true;
        });

        // Cinematic camera movement with parallax
        const parallaxX = Math.sin(time * 0.5) * 8;
        const parallaxY = 20 + Math.cos(time * 0.3) * 5;
        const parallaxZ = 100 + Math.sin(time * 0.2) * 20;
        
        this.camera.position.x = parallaxX;
        this.camera.position.y = parallaxY;
        this.camera.position.z = parallaxZ;
        
        // Look at a point slightly offset for dynamic feel
        this.camera.lookAt(
            Math.sin(time * 0.1) * 5,
            Math.cos(time * 0.15) * 3,
            0
        );

        this.renderer.render(this.scene, this.camera);
    }
            // Remove DOM elements
            if (this.container && this.container.parentNode) {
                this.container.parentNode.removeChild(this.container);
            }

            // Restore page
            document.body.style.overflow = '';
            
            console.log('✨ Cinema-Quality Space Preloader completed!');
        }, 1200);
    }
}

// Start immediately - ALWAYS SHOW FOR TESTING (remove comment to enable session storage)
function initCinemaPreloader() {
    console.log('🎬 Checking session storage...');
    
    // TEMPORARILY DISABLED FOR TESTING - UNCOMMENT TO ENABLE SESSION STORAGE
    // if (sessionStorage.getItem('spacePreloaderShown')) {
    //     console.log('⏭️ Preloader already shown this session');
    //     return;
    // }
    
    console.log('🎬 Creating Cinema-Quality Space Preloader!');
    
    if (window.THREE) {
        // Remove immediate preloader first
        const immediatePreloader = document.getElementById('immediatePreloader');
        if (immediatePreloader) {
            immediatePreloader.remove();
        }
        new CinemaSpacePreloader();
        // sessionStorage.setItem('spacePreloaderShown', 'true');
    } else {
        console.log('Loading Three.js...');
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = () => {
            console.log('Three.js loaded! Creating Cinema-Quality Space Preloader!');
            // Remove immediate preloader first
            const immediatePreloader = document.getElementById('immediatePreloader');
            if (immediatePreloader) {
                immediatePreloader.remove();
            }
            new CinemaSpacePreloader();
            // sessionStorage.setItem('spacePreloaderShown', 'true');
        };
        script.onerror = () => {
            console.error('Failed to load Three.js');
            // Remove immediate preloader on error
            const immediatePreloader = document.getElementById('immediatePreloader');
            if (immediatePreloader) {
                immediatePreloader.remove();
                document.body.style.overflow = '';
            }
        };
        document.head.appendChild(script);
    }
}

// Start immediately
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCinemaPreloader);
} else {
    initCinemaPreloader();
}

// Global function to reset preloader (for testing)
window.resetProfessionalPreloader = () => {
    sessionStorage.removeItem('spacePreloaderShown');
    location.reload();
};

// Clear preloader session on development
window.addEventListener('beforeunload', () => {
    if (window.location.hostname === 'localhost' || window.location.search.includes('dev')) {
        // Only clear on localhost for development
        // sessionStorage.removeItem('spacePreloaderShown');
    }
});

// Emergency function to clear and restart
window.clearSpacePreloader = () => {
    sessionStorage.clear();
    location.reload();
};
