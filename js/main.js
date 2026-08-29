/* ==========================================================================
   MAIN JAVASCRIPT ENTRYPOINT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Custom Fluid Cursor
  if (typeof window.CustomCursor === 'function') {
    new window.CustomCursor();
  }

  // 2. Initialize Question Path Graphic
  if (document.getElementById('question-path-canvas')) {
    new window.QuestionPathGraphic('question-path-canvas');
  }

  // 3. Initialize Flowing Textile Thread Canvas
  if (document.getElementById('textile-thread-canvas')) {
    new window.TextileThread('textile-thread-canvas');
  }

  // 4. Initialize Interactive Value Chains
  if (typeof window.initValueChains === 'function') {
    window.initValueChains();
  }

  // 5. Initialize Skills Constellation
  if (typeof window.initSkillsConstellation === 'function') {
    window.initSkillsConstellation();
  }

  // 6. Initialize Protosem Journal Manager
  if (typeof window.JournalManager === 'function') {
    window.journalInstance = new window.JournalManager();
  }

  // 7. Initialize General Interactions (Lightbox, Modals, Progress)
  if (typeof window.initInteractions === 'function') {
    window.initInteractions();
  }

  // 8. Initialize Elevated Graphics & Easter Eggs
  if (typeof window.initElevatedInteractions === 'function') {
    window.initElevatedInteractions();
  }

  // Log confirmation
  console.log("✦ 'Live with the Question' Elevated Portfolio Initialized.");
});
