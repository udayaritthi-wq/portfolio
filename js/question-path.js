/* ==========================================================================
   QUESTION-MARK PATH & EXPLORATION ANIMATION
   Philosophy: ? -> Explore -> Research -> Create -> Learn
   ========================================================================== */

class QuestionPathGraphic {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 100 };
    this.stages = [
      { name: '?', color: '#D9532F' },
      { name: 'Explore', color: '#1F4E5B' },
      { name: 'Research', color: '#D99B26' },
      { name: 'Create', color: '#2A5C4A' },
      { name: 'Learn', color: '#7E22CE' }
    ];

    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || 400;
    this.height = this.canvas.parentElement.clientHeight || 120;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  init() {
    this.particles = [];
    const particleCount = Math.floor(this.width / 18);
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: (this.width / particleCount) * i,
        baseY: this.height / 2,
        y: this.height / 2,
        size: Math.random() * 2.5 + 1.5,
        speed: Math.random() * 0.02 + 0.01,
        angle: i * 0.4,
        color: i % 2 === 0 ? '#D9532F' : '#1F4E5B'
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw wavy dashed exploration line
    this.ctx.beginPath();
    this.ctx.setLineDash([4, 6]);
    this.ctx.strokeStyle = '#D4C9BC';
    this.ctx.lineWidth = 1.5;

    const time = Date.now() * 0.002;
    for (let x = 0; x <= this.width; x += 10) {
      const y = this.height / 2 + Math.sin(x * 0.015 + time) * 12;
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();
    this.ctx.setLineDash([]); // Reset line dash

    // Animate exploration particles
    this.particles.forEach((p, idx) => {
      p.angle += p.speed;
      p.y = p.baseY + Math.sin(p.angle) * 14;

      // Mouse repulsion
      if (this.mouse.x !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 15;
          p.y -= (dy / dist) * force;
        }
      }

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

window.QuestionPathGraphic = QuestionPathGraphic;
