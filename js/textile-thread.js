/* ==========================================================================
   THE TEXTILE THREAD MOTIF
   A continuous visual thread connecting stages:
   Cotton -> Yarn -> Fabric -> Ethnic Wear -> Consumer
   ========================================================================== */

class TextileThread {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    this.animate();
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth || 600;
    this.height = 40;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const time = Date.now() * 0.0025;

    // Draw weaving thread
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#D9532F';
    this.ctx.lineWidth = 2;

    for (let x = 0; x <= this.width; x += 5) {
      const y = this.height / 2 + Math.sin(x * 0.02 + time) * 8 * Math.cos(x * 0.005);
      if (x === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();

    // Draw spindle knots along thread
    const knots = [0.15, 0.35, 0.55, 0.75, 0.9];
    knots.forEach((k) => {
      const kx = this.width * k;
      const ky = this.height / 2 + Math.sin(kx * 0.02 + time) * 8 * Math.cos(kx * 0.005);
      
      this.ctx.beginPath();
      this.ctx.arc(kx, ky, 3.5, 0, Math.PI * 2);
      this.ctx.fillStyle = '#D99B26';
      this.ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

window.TextileThread = TextileThread;
