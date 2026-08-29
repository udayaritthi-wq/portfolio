/* ==========================================================================
   CUSTOM CURSOR SYSTEM
   Desktop fluid cursor with contextual morphing (?, →, EXPLORE)
   ========================================================================== */

class CustomCursor {
  constructor() {
    // Only initialize on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024) {
      return;
    }

    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';

    this.follower = document.createElement('div');
    this.follower.className = 'custom-cursor-follower';

    document.body.appendChild(this.cursor);
    document.body.appendChild(this.follower);

    this.pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    this.mouse = { x: this.pos.x, y: this.pos.y };
    this.speed = 0.18; // Lerp ease factor

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.cursor.style.transform = `translate(${this.mouse.x}px, ${this.mouse.y}px) translate(-50%, -50%)`;
    });

    document.addEventListener('mouseover', (e) => {
      const target = e.target;
      
      // Question Mark Hover
      if (target.closest('.brand-mark, .inquiry-card-q-icon, [data-cursor="question"]')) {
        document.body.classList.add('cursor-state-question');
      } 
      // Explore Hover
      else if (target.closest('.chain-node, .skill-node-bubble, .research-pinned-card, [data-cursor="explore"]')) {
        document.body.classList.add('cursor-state-explore');
      }
      // Link / Action Button Hover
      else if (target.closest('a, button, .btn, [data-cursor="arrow"]')) {
        document.body.classList.add('cursor-state-arrow');
      }
    });

    document.addEventListener('mouseout', (e) => {
      const target = e.target;
      if (target.closest('.brand-mark, .inquiry-card-q-icon, [data-cursor="question"]')) {
        document.body.classList.remove('cursor-state-question');
      }
      if (target.closest('.chain-node, .skill-node-bubble, .research-pinned-card, [data-cursor="explore"]')) {
        document.body.classList.remove('cursor-state-explore');
      }
      if (target.closest('a, button, .btn, [data-cursor="arrow"]')) {
        document.body.classList.remove('cursor-state-arrow');
      }
    });
  }

  render() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;

    this.follower.style.transform = `translate(${this.pos.x}px, ${this.pos.y}px) translate(-50%, -50%)`;
    requestAnimationFrame(() => this.render());
  }
}

window.CustomCursor = CustomCursor;
