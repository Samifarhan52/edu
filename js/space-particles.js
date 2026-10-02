/**
 * EduConsultants - Ambient 3D Space & Flight Particles
 * Light, responsive constellation depth field that accelerates with scroll velocity
 */

(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'ambient-space-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.55';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const NUM_STARS = window.innerWidth < 768 ? 45 : 95;

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initStars();
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < NUM_STARS; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                z: Math.random() * width,
                size: Math.random() * 1.5 + 0.5,
                color: Math.random() > 0.8 ? '#f5c042' : (Math.random() > 0.5 ? '#38bdf8' : '#e2e8f0'),
                alpha: Math.random() * 0.7 + 0.2
            });
        }
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const delta = currentY - lastScrollY;
        scrollSpeed = delta * 0.12;
        lastScrollY = currentY;
    }, { passive: true });

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Decay scroll speed smoothly
        scrollSpeed *= 0.92;

        const cx = width / 2;
        const cy = height / 2;

        for (let i = 0; i < stars.length; i++) {
            const s = stars[i];

            // Speed driven by baseline drift + scroll velocity
            s.z -= (0.4 + scrollSpeed);

            if (s.z <= 0) {
                s.z = width;
                s.x = Math.random() * width;
                s.y = Math.random() * height;
            } else if (s.z > width) {
                s.z = 1;
                s.x = Math.random() * width;
                s.y = Math.random() * height;
            }

            const k = 250 / s.z;
            const px = (s.x - cx) * k + cx;
            const py = (s.y - cy) * k + cy;

            if (px >= 0 && px <= width && py >= 0 && py <= height) {
                const size = Math.max(0.6, s.size * k);
                const alpha = Math.min(1, s.alpha * (1 - s.z / width));

                ctx.beginPath();
                ctx.arc(px, py, size, 0, Math.PI * 2);
                ctx.fillStyle = s.color;
                ctx.globalAlpha = alpha;
                ctx.fill();

                // Draw subtle streak if moving quickly
                if (Math.abs(scrollSpeed) > 1.5) {
                    ctx.beginPath();
                    ctx.moveTo(px, py);
                    ctx.lineTo(px, py - scrollSpeed * 2);
                    ctx.strokeStyle = s.color;
                    ctx.lineWidth = size * 0.8;
                    ctx.stroke();
                }
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
})();
