/**
 * Edconsultants - Mobile Scroll Journey Flow Controller
 * Controls the smartphone simulator, 3D zoom in/out, stage transitions and audio feedback
 */

class MobileJourneyEngine {
    constructor() {
        this.phoneScreen = document.getElementById('phoneScreen');
        this.slides = document.querySelectorAll('.journey-step-slide');
        this.bullets = document.querySelectorAll('.step-bullet-btn');
        this.islandStatus = document.getElementById('islandStatusText');
        this.launcherPill = document.getElementById('journeyLauncherPill');
        this.currentStage = 0;
        this.isAutoPlaying = false;
        this.autoPlayTimer = null;

        this.init();
    }

    init() {
        if (!this.phoneScreen || this.slides.length === 0) return;

        // Listen for scroll inside the phone simulator
        this.phoneScreen.addEventListener('scroll', () => this.handlePhoneScroll(), { passive: true });

        // Bullet buttons click
        this.bullets.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                this.goToStage(idx);
            });
        });

        // Floating Launcher Pill click
        if (this.launcherPill) {
            this.launcherPill.addEventListener('click', () => {
                const target = document.getElementById('mobileJourneySection');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                    // Highlight the phone with a glow
                    const device = document.querySelector('.phone-device');
                    if (device) {
                        device.style.transform = 'scale(1.04)';
                        setTimeout(() => { device.style.transform = 'scale(1)'; }, 600);
                    }
                }
            });
        }

        // Set initial stage
        this.updateStageUI(0);
    }

    handlePhoneScroll() {
        const scrollTop = this.phoneScreen.scrollTop;
        const scrollHeight = this.phoneScreen.scrollHeight - this.phoneScreen.clientHeight;
        const progress = Math.min(1, Math.max(0, scrollTop / scrollHeight));

        const stageIndex = Math.min(this.slides.length - 1, Math.floor(progress * this.slides.length));

        if (stageIndex !== this.currentStage) {
            this.currentStage = stageIndex;
            this.updateStageUI(stageIndex);
        }
    }

    goToStage(index) {
        if (index < 0 || index >= this.slides.length) return;
        this.currentStage = index;

        const targetSlide = this.slides[index];
        if (targetSlide) {
            this.phoneScreen.scrollTo({
                top: targetSlide.offsetTop - 60,
                behavior: 'smooth'
            });
        }

        this.updateStageUI(index);
    }

    updateStageUI(index) {
        const stageTitles = [
            "01: Search & Discover",
            "02: Compare & Strategize",
            "03: Engage & Consult",
            "04: Apply & Clear Visa",
            "05: Start & Thrive"
        ];

        // Update Dynamic Island
        if (this.islandStatus) {
            this.islandStatus.textContent = stageTitles[index] || "Edconsultants Flow";
        }

        // Update Bullets
        this.bullets.forEach((b, i) => {
            b.classList.toggle('active', i === index);
        });

        // Update Slides zoom states
        this.slides.forEach((slide, i) => {
            slide.classList.remove('active-step', 'zoom-in', 'zoom-out');
            if (i === index) {
                slide.classList.add('active-step', 'zoom-in');
            } else if (i < index) {
                slide.classList.add('zoom-out');
            }
        });

        // Play subtle sound if supported
        this.playStageChime(index);
    }

    playStageChime(index) {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            const freqs = [440, 523.25, 587.33, 659.25, 783.99];
            osc.frequency.setValueAtTime(freqs[index] || 520, ctx.currentTime);

            gain.gain.setValueAtTime(0.03, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.35);
        } catch (e) {
            // Audio policy fallback
        }
    }

    toggleAutoTour() {
        this.isAutoPlaying = !this.isAutoPlaying;
        const autoBtn = document.getElementById('autoTourBtn');
        if (autoBtn) {
            autoBtn.textContent = this.isAutoPlaying ? "Pause Journey Tour ⏸️" : "Start Auto Journey Tour ▶️";
        }

        if (this.isAutoPlaying) {
            this.autoPlayTimer = setInterval(() => {
                let next = (this.currentStage + 1) % this.slides.length;
                this.goToStage(next);
            }, 3000);
        } else {
            clearInterval(this.autoPlayTimer);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.mobileJourney = new MobileJourneyEngine();
});
