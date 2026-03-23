// ── GRADIENT MESH BACKGROUND ──
const canvas = document.getElementById('meshCanvas');
const ctx = canvas.getContext('2d');

let w, h;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// Orb definition — position, size, color, speed
const orbs = [
  { x: 0.15, y: 0.2,  r: 0.55, color: [232, 213, 163], speed: 0.00018, phase: 0 },
  { x: 0.85, y: 0.75, r: 0.50, color: [100, 160, 220], speed: 0.00013, phase: 1.5 },
  { x: 0.5,  y: 0.5,  r: 0.45, color: [180, 140, 200], speed: 0.00010, phase: 3.0 },
  { x: 0.1,  y: 0.85, r: 0.40, color: [232, 213, 163], speed: 0.00015, phase: 4.5 },
  { x: 0.9,  y: 0.1,  r: 0.38, color: [100, 160, 220], speed: 0.00020, phase: 2.0 },
];

function drawMesh(t) {
  ctx.clearRect(0, 0, w, h);

  orbs.forEach(orb => {
    // Drift slowly in a Lissajous-like path
    const ox = orb.x + Math.sin(t * orb.speed + orb.phase) * 0.18;
    const oy = orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.14;

    const cx = ox * w;
    const cy = oy * h;
    const radius = orb.r * Math.max(w, h);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    const [r, g, b] = orb.color;
    grad.addColorStop(0,   `rgba(${r},${g},${b},0.12)`);
    grad.addColorStop(0.4, `rgba(${r},${g},${b},0.05)`);
    grad.addColorStop(1,   `rgba(${r},${g},${b},0)`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  });
}

let rafId;
function animate(t) {
  drawMesh(t);
  rafId = requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});
