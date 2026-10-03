/**
 * The Edu Consultant - 3D Depth Scroll Journey Controller
 * Drives spatial camera Z-axis dolly, card transitions & interactive telemetry HUD
 */

class EduJourneyController {
    constructor() {
        this.tunnel = document.getElementById('journeyTunnel');
        this.viewport = document.querySelector('.journey-sticky-viewport');
        this.cards = document.querySelectorAll('.journey-milestone-card');
        this.beacons = document.querySelectorAll('.hud-beacon-dot');
        this.depthDisplay = document.getElementById('hudDepthValue');
        this.stageDisplay = document.getElementById('hudStageTitle');
        this.modeBtn = document.getElementById('modeSwitchBtn');
        this.audioBtn = document.getElementById('audioToggleBtn');

        this.currentStageIndex = 0;
        this.isClassicMode = false;
        this.audioEnabled = false;
        this.audioCtx = null;

        this.init();
    }

    init() {
        if (!this.tunnel || this.cards.length === 0) return;

        // Listen for scroll events with passive performance
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.handleScroll());

        // Setup Beacon Clicks for quick navigation
        this.beacons.forEach((beacon) => {
            beacon.addEventListener('click', (e) => {
                const targetIdx = parseInt(e.currentTarget.getAttribute('data-stage'), 10);
                this.scrollToStage(targetIdx);
            });
        });

        // Setup Mode Toggle (3D Zoom vs Classic)
        if (this.modeBtn) {
            this.modeBtn.addEventListener('click', () => this.toggleMode());
        }

        // Setup Spatial Sound Toggle
        if (this.audioBtn) {
            this.audioBtn.addEventListener('click', () => this.toggleAudio());
        }

        // Run initial calculation
        this.handleScroll();
    }

    handleScroll() {
        if (this.isClassicMode) return;

        const rect = this.tunnel.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const totalScrollable = rect.height - windowHeight;

        // If we are above the tunnel
        if (rect.top > 0) {
            this.updateDepthHUD(0, 0);
            this.setCardsInitial();
            return;
        }

        // Progress fraction from 0.0 to 1.0 through the tunnel
        const scrolled = -rect.top;
        let progress = scrolled / totalScrollable;
        progress = Math.max(0, Math.min(1, progress));

        const numStages = this.cards.length;
        // Map 0..1 to stage range [0 .. numStages - 1]
        const exactStage = progress * (numStages - 1);
        const activeIndex = Math.round(exactStage);

        // Check if stage changed to play subtle chime
        if (activeIndex !== this.currentStageIndex) {
            this.playSpatialChime(activeIndex);
            this.currentStageIndex = activeIndex;
        }

        // Update each card's 3D spatial coordinate
        this.cards.forEach((card, index) => {
            const delta = index - exactStage; // 0 when directly at card, -1 if passed, +1 if upcoming

            // Cinematic Z-depth calculation
            const zTranslate = delta * -500; // in px
            const scale = Math.max(0.4, 1 - Math.abs(delta) * 0.28);
            const opacity = Math.max(0, 1 - Math.pow(Math.abs(delta), 1.8) * 0.95);
            const blur = Math.max(0, Math.abs(delta) * 10);

            // Subtle rotation tilt for depth feel
            const rotX = delta * 4;
            const rotY = delta * -2;

            if (opacity <= 0.02) {
                card.style.transform = `translate3d(0, 0, ${zTranslate}px) scale(${scale}) rotateX(${rotX}deg)`;
                card.style.opacity = '0';
                card.style.filter = `blur(${blur}px)`;
                card.style.pointerEvents = 'none';
            } else {
                card.style.transform = `translate3d(0, 0, ${zTranslate}px) scale(${scale}) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
                card.style.opacity = opacity.toFixed(2);
                card.style.filter = `blur(${blur.toFixed(1)}px)`;
                card.style.pointerEvents = Math.abs(delta) < 0.4 ? 'auto' : 'none';

                if (Math.abs(delta) < 0.4) {
                    card.classList.add('state-active-focus');
                } else {
                    card.classList.remove('state-active-focus');
                }
            }
        });

        // Update HUD
        const depthPercent = Math.round(progress * 100);
        this.updateDepthHUD(depthPercent, activeIndex);
    }

    setCardsInitial() {
        this.cards.forEach((card, i) => {
            if (i === 0) {
                card.style.transform = 'translate3d(0, 0, 0px) scale(1)';
                card.style.opacity = '1';
                card.style.filter = 'blur(0px)';
                card.style.pointerEvents = 'auto';
                card.classList.add('state-active-focus');
            } else {
                const z = -500 * i;
                card.style.transform = `translate3d(0, 0, ${z}px) scale(0.6)`;
                card.style.opacity = '0';
                card.style.filter = 'blur(10px)';
                card.style.pointerEvents = 'none';
                card.classList.remove('state-active-focus');
            }
        });
    }

    updateDepthHUD(depthPercent, activeIndex) {
        if (this.depthDisplay) {
            this.depthDisplay.textContent = `${depthPercent}%`;
        }

        const stageNames = [
            "01: Search & Discover",
            "02: Compare & Strategize",
            "03: Engage & Consult",
            "04: Apply & Clear Visa",
            "05: Start & Thrive"
        ];

        if (this.stageDisplay) {
            this.stageDisplay.textContent = stageNames[activeIndex] || "Journey Overview";
        }

        // Update Beacon dots
        this.beacons.forEach((b, idx) => {
            b.classList.remove('active', 'completed');
            if (idx === activeIndex) {
                b.classList.add('active');
            } else if (idx < activeIndex) {
                b.classList.add('completed');
            }
        });
    }

    scrollToStage(index) {
        const rect = this.tunnel.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const totalScrollable = this.tunnel.offsetHeight - window.innerHeight;
        const targetProgress = index / (this.cards.length - 1);
        const targetScrollY = scrollTop + rect.top + (targetProgress * totalScrollable);

        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    }

    toggleMode() {
        this.isClassicMode = !this.isClassicMode;
        document.body.classList.toggle('mode-classic', this.isClassicMode);

        if (this.modeBtn) {
            const label = this.modeBtn.querySelector('.mode-label');
            if (label) {
                label.textContent = this.isClassicMode ? "3D Journey Mode" : "Classic View";
            }
        }

        if (this.isClassicMode) {
            // Reset styles for classic view
            this.cards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '1';
                card.style.filter = 'none';
                card.style.pointerEvents = 'auto';
            });
        } else {
            this.handleScroll();
        }
    }

    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        if (this.audioEnabled && !this.audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.audioCtx = new AudioContext();
            }
        }

        if (this.audioBtn) {
            const icon = this.audioBtn.querySelector('i') || this.audioBtn;
            this.audioBtn.classList.toggle('text-amber-400', this.audioEnabled);
            this.audioBtn.title = this.audioEnabled ? "Spatial Audio: Enabled" : "Spatial Audio: Muted";
        }

        if (this.audioEnabled) {
            this.playSpatialChime(this.currentStageIndex);
        }
    }

    playSpatialChime(stageIdx) {
        if (!this.audioEnabled || !this.audioCtx) return;

        try {
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            // Harmonic chord progression across stages
            const baseFreqs = [440, 523.25, 587.33, 659.25, 783.99]; // A4, C5, D5, E5, G5
            const freq = baseFreqs[stageIdx] || 520;

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

            gain.gain.setValueAtTime(0.04, this.audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.45);

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            osc.start();
            osc.stop(this.audioCtx.currentTime + 0.5);
        } catch (e) {
            // Audio policy fallback
        }
    }
}

// Instantiate once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.eduJourney = new EduJourneyController();
});
