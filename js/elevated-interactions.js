/* ==========================================================================
   ELEVATED INTERACTIONS & VISUAL EASTER EGGS
   ========================================================================== */

function initElevatedInteractions() {
  // 1. Easter Egg: Brand Mark '?' Click
  const brandMarks = document.querySelectorAll('.brand-mark, .final-morphing-glyph');
  brandMarks.forEach(mark => {
    mark.addEventListener('click', (e) => {
      e.preventDefault();
      if (typeof window.showToast === 'function') {
        window.showToast("✦ Keep asking. Good questions shape the future.");
      }
      mark.style.transform = 'scale(1.3) rotate(360deg)';
      setTimeout(() => {
        mark.style.transform = '';
      }, 600);
    });
  });

  // 2. "Behind the Experience" Tabs Toggle
  const revealContainers = document.querySelectorAll('.experience-reveal-wrapper');
  revealContainers.forEach(container => {
    const tabs = container.querySelectorAll('.reveal-tab-btn');
    const panes = container.querySelectorAll('.reveal-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-target-pane');
        
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const activePane = container.querySelector(`#${targetId}`);
        if (activePane) activePane.classList.add('active');
      });
    });
  });

  // 3. Margin Annotations Interactive Thoughts
  const marginNotes = document.querySelectorAll('.margin-annotation');
  marginNotes.forEach(note => {
    note.addEventListener('click', () => {
      const thought = note.getAttribute('data-thought') || "Questions lead to exploration.";
      if (typeof window.showToast === 'function') {
        window.showToast(`✦ Field Note: ${thought}`);
      }
    });
  });

  // 4. Research Pinned Cards Micro-Interaction
  const pinnedCards = document.querySelectorAll('.research-pinned-card');
  pinnedCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'var(--accent-saffron)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = '';
    });
  });
}

window.initElevatedInteractions = initElevatedInteractions;
