const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const noBtnFloat = document.getElementById('noBtnFloat');
const question = document.getElementById('question');
const buttonsContainer = document.querySelector('.buttons');
const moodEmoji = document.getElementById('moodEmoji');

// Escalating scared emojis for No hovers
const scaredEmojis = ['😟', '😨', '😰', '😱', '💀'];
let noHoverCount = 0;

// Yes button hover — hopeful/excited
let beatAnimations = [];

yesBtn.addEventListener('mouseover', () => {
    moodEmoji.innerText = '😍';
    moodEmoji.style.transform = 'scale(1.2)';

    // Use Web Animations API to layer beat on top of existing float (no restart!)
    const hearts = document.querySelectorAll('.hearts-bg .heart:not(.burst-heart)');
    hearts.forEach(h => {
        const anim = h.animate([
            { filter: 'drop-shadow(0 0 4px rgba(255, 100, 130, 0.3))', offset: 0 },
            { filter: 'drop-shadow(0 0 25px rgba(255, 50, 100, 1)) brightness(1.5)', offset: 0.15 },
            { filter: 'drop-shadow(0 0 4px rgba(255, 100, 130, 0.3))', offset: 0.30 },
            { filter: 'drop-shadow(0 0 18px rgba(255, 50, 100, 0.8)) brightness(1.3)', offset: 0.45 },
            { filter: 'drop-shadow(0 0 4px rgba(255, 100, 130, 0.3))', offset: 0.60 },
            { filter: 'drop-shadow(0 0 4px rgba(255, 100, 130, 0.3))', offset: 1 },
        ], {
            duration: 1000,
            iterations: Infinity,
            easing: 'ease-in-out',
        });
        beatAnimations.push(anim);
    });
});
yesBtn.addEventListener('mouseout', () => {
    moodEmoji.innerText = '🥺';
    moodEmoji.style.transform = 'scale(1)';
    // Cancel all beat animations
    beatAnimations.forEach(a => a.cancel());
    beatAnimations = [];
});

// Spawn aggressive hearts on No hover
const heartEmojis = ['❤', '💕', '💗', '💖', '💘', '💝', '💞', '♥️'];

function spawnHearts(count) {
    const heartsBg = document.querySelector('.hearts-bg');
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart burst-heart';
        heart.innerText = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        // Random position across the screen
        const leftPos = Math.random() * 100;
        const size = Math.random() * 24 + 14;
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 0.5;
        heart.style.cssText = `
            left: ${leftPos}%;
            font-size: ${size}px;
            animation: burstHeart ${duration}s ease-out ${delay}s forwards;
            opacity: 0;
            bottom: -50px;
        `;
        heartsBg.appendChild(heart);
        // Remove after animation completes
        setTimeout(() => heart.remove(), (duration + delay) * 1000 + 200);
    }
}

// No button hover — escalating fear
function onNoHover() {
    const idx = Math.min(noHoverCount, scaredEmojis.length - 1);
    moodEmoji.innerText = scaredEmojis[idx];
    // Shake harder the more they hover
    const shakeAmount = Math.min(noHoverCount * 2, 12);
    moodEmoji.style.transform = `scale(${1 + noHoverCount * 0.1}) rotate(${Math.random() > 0.5 ? shakeAmount : -shakeAmount}deg)`;
    noHoverCount++;
}

// On first hover of the original No button, hide it and show the floating one
function activateFloatingNo() {
    onNoHover();
    spawnHearts(5 + noHoverCount);
    noBtn.style.display = 'none';
    noBtnFloat.style.display = 'block';
    moveButton();
}
noBtn.addEventListener('mouseover', activateFloatingNo);
noBtn.addEventListener('click', activateFloatingNo);

// Yes button functionality
yesBtn.addEventListener('click', () => {
    const celebrationTexts = [
        "Two hearts, a lifetime ahead — let's make every moment beautiful 💞🌹",
        "Two hearts, one promise — to make this journey the most beautiful one 💞🌹",
        "A long journey awaits us — let's make every step of it beautiful, together 🌹💗"
    ];
    question.innerHTML = celebrationTexts[Math.floor(Math.random() * celebrationTexts.length)];
    // Keep photo visible on celebration
    document.getElementById('valentinePhoto').style.display = 'block';
    // Hide buttons and the No button
    buttonsContainer.style.display = 'none';
    noBtn.style.display = 'none';
    noBtnFloat.style.display = 'none';
    
    // Change background to celebrate
    document.body.style.background = "linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)";

    // Launch confetti 🎉
    launchConfetti();
    // Launch fireworks 🎆
    launchFireworks();

    // Enable click-to-burst on celebration screen
    enableClickBurst();
});

// Click anywhere to burst flowers & sparks
function enableClickBurst() {
    const flowerEmojis = ['🌸', '🌺', '🌹', '🌷', '💐', '🌻', '🌼', '💮', '🏵️', '✨', '💖', '💗', '💕'];

    document.addEventListener('click', function clickBurst(e) {
        const x = e.clientX;
        const y = e.clientY;
        const count = Math.floor(Math.random() * 10) + 15;

        for (let i = 0; i < count; i++) {
            const el = document.createElement('span');
            el.innerText = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
            el.style.position = 'fixed';
            el.style.left = x + 'px';
            el.style.top = y + 'px';
            el.style.fontSize = (Math.random() * 18 + 12) + 'px';
            el.style.pointerEvents = 'none';
            el.style.zIndex = '10000';
            document.body.appendChild(el);

            // Random direction burst
            const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.5 - 0.25);
            const speed = Math.random() * 120 + 60;
            const destX = Math.cos(angle) * speed;
            const destY = Math.sin(angle) * speed;
            const rotation = Math.random() * 720 - 360;

            el.animate([
                { transform: 'translate(0, 0) scale(0.3) rotate(0deg)', opacity: 1 },
                { transform: `translate(${destX}px, ${destY}px) scale(1.2) rotate(${rotation}deg)`, opacity: 1, offset: 0.4 },
                { transform: `translate(${destX * 1.3}px, ${destY * 1.3 + 40}px) scale(0.5) rotate(${rotation * 1.5}deg)`, opacity: 0 },
            ], {
                duration: Math.random() * 600 + 800,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                fill: 'forwards',
            }).onfinish = () => el.remove();
        }
    });
}

// Confetti effect
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.id = 'confettiCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff4d6d', '#ff758c', '#ff7eb3', '#ff9a9e', '#ffd700', '#ff6b81', '#ee5a9f', '#c9184a', '#fff', '#ffb3c6'];
    const confettiCount = 200;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 5 + 2,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
            opacity: 1,
        });
    }

    let frame = 0;
    const maxFrames = 300;

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        frame++;

        confetti.forEach(c => {
            c.x += c.speedX;
            c.y += c.speedY;
            c.rotation += c.rotationSpeed;
            // Fade out in the last 60 frames
            if (frame > maxFrames - 60) {
                c.opacity = Math.max(0, c.opacity - 0.02);
            }

            ctx.save();
            ctx.translate(c.x + c.w / 2, c.y + c.h / 2);
            ctx.rotate((c.rotation * Math.PI) / 180);
            ctx.globalAlpha = c.opacity;
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();
        });

        if (frame < maxFrames) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    animate();
}

// Fireworks effect 🎆
function launchFireworks() {
    const canvas = document.createElement('canvas');
    canvas.id = 'fireworksCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9998';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#ff4d6d', '#ff758c', '#ff7eb3', '#ffd700', '#ff6b81', '#ee5a9f', '#c9184a', '#ffb3c6', '#ff69b4', '#fff'];

    class Particle {
        constructor(x, y, color, angle, speed, size, gravity, friction, fadeRate) {
            this.x = x;
            this.y = y;
            this.color = color;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.size = size;
            this.gravity = gravity;
            this.friction = friction;
            this.opacity = 1;
            this.fadeRate = fadeRate;
            this.trail = [];
        }
        update() {
            this.trail.push({ x: this.x, y: this.y, opacity: this.opacity });
            if (this.trail.length > 6) this.trail.shift();
            this.vx *= this.friction;
            this.vy *= this.friction;
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= this.fadeRate;
        }
        draw(ctx) {
            // Draw trail
            this.trail.forEach((t, i) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, this.size * (i / this.trail.length) * 0.5, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = t.opacity * 0.3;
                ctx.fill();
            });
            // Draw main particle
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.fill();
            // Draw glow
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
            gradient.addColorStop(0, this.color);
            gradient.addColorStop(1, 'transparent');
            ctx.fillStyle = gradient;
            ctx.globalAlpha = this.opacity * 0.4;
            ctx.fill();
        }
    }

    class Rocket {
        constructor(x, targetY) {
            this.x = x;
            this.y = canvas.height;
            this.targetY = targetY;
            this.vy = -(Math.random() * 4 + 6);
            this.opacity = 1;
            this.exploded = false;
            this.trail = [];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.trail.push({ x: this.x, y: this.y });
            if (this.trail.length > 10) this.trail.shift();
            this.y += this.vy;
            this.vy *= 0.98;
            if (this.y <= this.targetY) {
                this.exploded = true;
            }
        }
        draw(ctx) {
            // Draw rocket trail
            this.trail.forEach((t, i) => {
                ctx.beginPath();
                ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = (i / this.trail.length) * 0.5;
                ctx.fill();
            });
            // Draw rocket head
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#fff';
            ctx.globalAlpha = 1;
            ctx.fill();
        }
    }

    function createBurst(x, y) {
        const burstParticles = [];
        const burstColor = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = Math.floor(Math.random() * 40) + 50;
        // Random burst style
        const style = Math.floor(Math.random() * 3);

        for (let i = 0; i < particleCount; i++) {
            let angle, speed, size;
            if (style === 0) {
                // Circular burst
                angle = (Math.PI * 2 / particleCount) * i;
                speed = Math.random() * 4 + 2;
                size = Math.random() * 3 + 1;
            } else if (style === 1) {
                // Star burst — double ring
                angle = (Math.PI * 2 / particleCount) * i;
                speed = i % 2 === 0 ? Math.random() * 3 + 4 : Math.random() * 2 + 1;
                size = Math.random() * 2.5 + 1.5;
            } else {
                // Random scatter
                angle = Math.random() * Math.PI * 2;
                speed = Math.random() * 6 + 1;
                size = Math.random() * 3 + 0.5;
            }
            const color = Math.random() > 0.3 ? burstColor : colors[Math.floor(Math.random() * colors.length)];
            burstParticles.push(new Particle(x, y, color, angle, speed, size, 0.04, 0.97, Math.random() * 0.008 + 0.005));
        }
        return burstParticles;
    }

    let particles = [];
    let rockets = [];
    let totalRockets = 0;
    const maxRockets = 12;
    let lastLaunch = 0;
    const startTime = Date.now();
    const duration = 5000; // 5 seconds of fireworks

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const now = Date.now();
        const elapsed = now - startTime;

        // Launch new rockets over time
        if (elapsed < duration && now - lastLaunch > 350 && totalRockets < maxRockets) {
            const x = Math.random() * canvas.width * 0.6 + canvas.width * 0.2;
            const targetY = Math.random() * canvas.height * 0.4 + canvas.height * 0.1;
            rockets.push(new Rocket(x, targetY));
            totalRockets++;
            lastLaunch = now;
        }

        // Update & draw rockets
        rockets = rockets.filter(r => {
            if (!r.exploded) {
                r.update();
                r.draw(ctx);
                return true;
            } else {
                // Explode into particles
                particles.push(...createBurst(r.x, r.y));
                return false;
            }
        });

        // Update & draw particles
        particles = particles.filter(p => {
            p.update();
            if (p.opacity > 0) {
                p.draw(ctx);
                return true;
            }
            return false;
        });

        ctx.globalAlpha = 1;

        if (particles.length > 0 || rockets.length > 0 || elapsed < duration) {
            requestAnimationFrame(animate);
        } else {
            canvas.remove();
        }
    }

    animate();
}

const funTexts = [
    "Are you sure? 🥺", 
    "Really?! 😢", 
    "Think again! 💭", 
    "Last chance! ⏳", 
    "Pretty please? 🙏", 
    "Don't do this! 😭", 
    "Have a heart! 💔",
    "Why not? 😿",
    "Give it a try! 🌹",
    "I'll cry... 😢",
    "Noooo! 😩",
    "Reconsider! 💕",
    "Don't be mean! 😤",
    "Pick Yes! ✨",
    "Wrong answer! ❌",
    "Try again 🥺",
    "Not this one! 👆",
    "I dare you 😈",
    "Can't touch this! 🎵",
];

// Button colors to cycle through
const noBtnColors = [
    { bg: '#e9ecef', text: '#495057' },
    { bg: '#ffccd5', text: '#c9184a' },
    { bg: '#ffd6a5', text: '#b5651d' },
    { bg: '#caffbf', text: '#2d6a4f' },
    { bg: '#bde0fe', text: '#023e8a' },
    { bg: '#ffc8dd', text: '#d63384' },
    { bg: '#a0c4ff', text: '#1d3557' },
    { bg: '#ffadad', text: '#9d0208' },
    { bg: '#d0f4de', text: '#1b4332' },
    { bg: '#e4c1f9', text: '#7b2cbf' },
];

// No button move functionality
const moveButton = () => {
    // Update emoji fear level
    onNoHover();

    // Aggressively spawn hearts — more each time!
    spawnHearts(3 + Math.min(noHoverCount * 2, 20));

    // Change text randomly
    const randomText = funTexts[Math.floor(Math.random() * funTexts.length)];
    noBtnFloat.innerText = randomText;

    // Change button color randomly
    const randomColor = noBtnColors[Math.floor(Math.random() * noBtnColors.length)];
    noBtnFloat.style.backgroundColor = randomColor.bg;
    noBtnFloat.style.color = randomColor.text;
    noBtnFloat.style.boxShadow = `0 3px 10px ${randomColor.bg}80`;

    // Quick shake animation
    noBtnFloat.style.animation = 'none';
    noBtnFloat.offsetHeight; // trigger reflow
    noBtnFloat.style.animation = 'noShake 0.4s ease';

    // Grow slightly with each hover to taunt
    const scale = Math.min(1 + noHoverCount * 0.02, 1.3);
    noBtnFloat.style.transform = `scale(${scale})`;

    // Calculate 70% zone centered on the viewport
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const zoneW = vw * 0.7;
    const zoneH = vh * 0.7;
    const zoneLeft = (vw - zoneW) / 2;
    const zoneTop = (vh - zoneH) / 2;

    // Get container rect to avoid overlapping with Yes button + text
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    // Safe button size estimate (use fixed size to avoid measurement issues)
    const btnWidth = 120;
    const btnHeight = 36;

    let randomX, randomY;
    let overlap = true;
    let attempts = 0;

    // Retry until we find a position that doesn't overlap with the card
    while (overlap && attempts < 100) {
        randomX = Math.floor(Math.random() * (zoneW - btnWidth)) + zoneLeft;
        randomY = Math.floor(Math.random() * (zoneH - btnHeight)) + zoneTop;

        // Clamp hard to viewport
        randomX = Math.max(10, Math.min(randomX, vw - btnWidth - 10));
        randomY = Math.max(10, Math.min(randomY, vh - btnHeight - 10));

        // Check rectangle intersection with a buffer around the card
        const buffer = 20;
        overlap = (
            randomX < containerRect.right + buffer &&
            randomX + btnWidth > containerRect.left - buffer &&
            randomY < containerRect.bottom + buffer &&
            randomY + btnHeight > containerRect.top - buffer
        );
        attempts++;
    }

    noBtnFloat.style.left = randomX + 'px';
    noBtnFloat.style.top = randomY + 'px';
};

noBtnFloat.addEventListener('mouseover', moveButton);
noBtnFloat.addEventListener('click', moveButton);
noBtnFloat.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton();
}, { passive: false });
