/* ==========================================================================
   PROTOSEM FIELD JOURNAL & LOCAL PHOTO MANAGER
   Day-by-Day Journal navigation, tab filters, local photo uploads & autosave
   ========================================================================== */

class JournalManager {
  constructor() {
    this.currentWeek = 'week0';
    this.currentDay = 'all';
    this.init();
  }

  init() {
    this.bindWeekTabs();
    this.bindDayPills();
    this.initEditableAreas();
    this.initPhotoManager();
    this.loadSavedPhotos();
    this.loadSavedNotes();
  }

  bindWeekTabs() {
    const weekBtns = document.querySelectorAll('.week-tab-btn');
    weekBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        weekBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentWeek = btn.getAttribute('data-week');
        this.updateView();
      });
    });
  }

  bindDayPills() {
    const dayPills = document.querySelectorAll('.day-pill-btn');
    dayPills.forEach(pill => {
      pill.addEventListener('click', () => {
        dayPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        this.currentDay = pill.getAttribute('data-day');
        this.updateView();
      });
    });
  }

  updateView() {
    const entries = document.querySelectorAll('.journal-entry-card');
    entries.forEach(entry => {
      const entryWeek = entry.getAttribute('data-week');
      const entryDay = entry.getAttribute('data-day');

      const matchesWeek = (this.currentWeek === 'all' || entryWeek === this.currentWeek);
      const matchesDay = (this.currentDay === 'all' || entryDay === this.currentDay);

      if (matchesWeek && matchesDay) {
        entry.style.display = 'block';
      } else {
        entry.style.display = 'none';
      }
    });

    // Update available day pills based on week
    const pills = document.querySelectorAll('.day-pill-btn[data-week-parent]');
    pills.forEach(pill => {
      const parentWeek = pill.getAttribute('data-week-parent');
      if (this.currentWeek === 'all' || parentWeek === this.currentWeek) {
        pill.style.display = 'inline-flex';
      } else {
        pill.style.display = 'none';
      }
    });
  }

  initEditableAreas() {
    const textareas = document.querySelectorAll('.journal-editable-note textarea');
    textareas.forEach(ta => {
      const noteId = ta.getAttribute('data-note-id') || 'spaghetti-tower-note';
      ta.addEventListener('input', () => {
        localStorage.setItem(`portfolio_note_${noteId}`, ta.value);
        const saveStatus = ta.parentElement.querySelector('.save-indicator');
        if (saveStatus) {
          saveStatus.textContent = 'Saved to journal ✓';
          setTimeout(() => { saveStatus.textContent = ''; }, 2000);
        }
      });
    });
  }

  loadSavedNotes() {
    const textareas = document.querySelectorAll('.journal-editable-note textarea');
    textareas.forEach(ta => {
      const noteId = ta.getAttribute('data-note-id') || 'spaghetti-tower-note';
      const saved = localStorage.getItem(`portfolio_note_${noteId}`);
      if (saved) {
        ta.value = saved;
      }
    });
  }

  /* ------------------------------------------------------------------------
     LOCAL PHOTO UPLOADER & REPLACER
     Allows replacing placeholders directly in browser without editing code!
     ------------------------------------------------------------------------ */
  initPhotoManager() {
    const uploadBtns = document.querySelectorAll('[data-photo-target]');
    uploadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetSlot = btn.getAttribute('data-photo-target');
        this.openPhotoModal(targetSlot);
      });
    });

    const fileInput = document.getElementById('local-photo-file-input');
    const urlInput = document.getElementById('local-photo-url-input');
    const savePhotoBtn = document.getElementById('save-local-photo-btn');
    const resetPhotoBtn = document.getElementById('reset-local-photo-btn');

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.tempPhotoData = event.target.result;
            const preview = document.getElementById('photo-modal-preview-img');
            if (preview) preview.src = this.tempPhotoData;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (urlInput) {
      urlInput.addEventListener('input', (e) => {
        if (e.target.value.trim().length > 5) {
          this.tempPhotoData = e.target.value.trim();
          const preview = document.getElementById('photo-modal-preview-img');
          if (preview) preview.src = this.tempPhotoData;
        }
      });
    }

    if (savePhotoBtn) {
      savePhotoBtn.addEventListener('click', () => {
        if (this.currentActivePhotoSlot && this.tempPhotoData) {
          localStorage.setItem(`portfolio_photo_${this.currentActivePhotoSlot}`, this.tempPhotoData);
          this.applyPhotoToSlot(this.currentActivePhotoSlot, this.tempPhotoData);
          this.closePhotoModal();
        }
      });
    }

    if (resetPhotoBtn) {
      resetPhotoBtn.addEventListener('click', () => {
        if (this.currentActivePhotoSlot) {
          localStorage.removeItem(`portfolio_photo_${this.currentActivePhotoSlot}`);
          location.reload();
        }
      });
    }
  }

  openPhotoModal(slotId) {
    this.currentActivePhotoSlot = slotId;
    this.tempPhotoData = null;
    const modal = document.getElementById('photo-uploader-modal');
    const title = document.getElementById('photo-modal-slot-title');
    const preview = document.getElementById('photo-modal-preview-img');
    const urlInput = document.getElementById('local-photo-url-input');

    if (title) title.textContent = `Upload / Replace: ${slotId.replace(/_/g, ' ').toUpperCase()}`;
    if (urlInput) urlInput.value = '';

    // Check if there is already a saved photo for this slot
    const existing = localStorage.getItem(`portfolio_photo_${slotId}`);
    if (preview) {
      if (existing) {
        preview.src = existing;
      } else {
        const currentSlotEl = document.querySelector(`[data-slot-id="${slotId}"] img`);
        if (currentSlotEl) preview.src = currentSlotEl.src;
      }
    }

    if (modal) modal.classList.add('open');
  }

  closePhotoModal() {
    const modal = document.getElementById('photo-uploader-modal');
    if (modal) modal.classList.remove('open');
  }

  applyPhotoToSlot(slotId, dataUrl) {
    const elements = document.querySelectorAll(`[data-slot-id="${slotId}"] img`);
    elements.forEach(img => {
      img.src = dataUrl;
    });
  }

  loadSavedPhotos() {
    const allSlotEls = document.querySelectorAll('[data-slot-id]');
    allSlotEls.forEach(el => {
      const slotId = el.getAttribute('data-slot-id');
      const saved = localStorage.getItem(`portfolio_photo_${slotId}`);
      if (saved) {
        const img = el.querySelector('img');
        if (img) img.src = saved;
      }
    });
  }
}

window.JournalManager = JournalManager;
