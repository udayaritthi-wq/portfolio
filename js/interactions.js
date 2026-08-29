/* ==========================================================================
   UI INTERACTIONS, LIGHTBOX, RESUME PREVIEW & TOASTS
   ========================================================================== */

function initInteractions() {
  // 1. Reading Progress Bar
  const progressBar = document.querySelector('.reading-progress-bar');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
  });

  // 2. Active Chapter Highlight in Nav
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 140;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 3. Lightbox System
  const lightbox = document.getElementById('global-lightbox');
  const lightboxImg = document.getElementById('lightbox-target-img');
  const lightboxCap = document.getElementById('lightbox-target-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('[data-lightbox]');
    if (target) {
      e.preventDefault();
      const img = target.querySelector('img') || target;
      const caption = target.getAttribute('data-caption') || target.querySelector('.featured-photo-caption, .mini-polaroid-caption, figcaption')?.textContent || '';
      
      if (lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCap) lightboxCap.textContent = caption;
        lightbox.classList.add('open');
      }
    }
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
      }
    });
  }

  // 4. Modal Close Helpers
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn, [data-modal-close]');
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.custom-modal-overlay');
      if (modal) modal.classList.remove('open');
    });
  });

  // 5. Resume Modal
  const resumeTriggers = document.querySelectorAll('[data-open-resume]');
  const resumeModal = document.getElementById('resume-preview-modal');
  resumeTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('open');
    });
  });

  // 6. Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobile-nav-toggle-btn');
  const mobileMenu = document.getElementById('mobile-nav-drawer');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
    });
  }

  // 7. Copy to Clipboard / Action Toast
  window.copyTextToClipboard = function(text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      showToast(`Contact: ${text}`);
    });
  };

  // 8. Customization for Name & Title
  const savedName = localStorage.getItem('portfolio_user_name');
  if (savedName) {
    document.querySelectorAll('.dynamic-user-name').forEach(el => el.textContent = savedName);
  }
}

function showToast(message) {
  let toast = document.getElementById('system-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'system-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #1C1917;
      color: #FAF7F2;
      padding: 12px 24px;
      border-radius: 999px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(0,0,0,0.25);
      z-index: 9999;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      border: 1px solid rgba(255,255,255,0.15);
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';

  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 2800);
}

window.initInteractions = initInteractions;
window.showToast = showToast;
