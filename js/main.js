/* ==========================================================================
   MAIN JAVASCRIPT ENTRYPOINT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Question Path Graphic
  if (document.getElementById('question-path-canvas')) {
    new window.QuestionPathGraphic('question-path-canvas');
  }

  // 2. Initialize Interactive Value Chains
  if (typeof window.initValueChains === 'function') {
    window.initValueChains();
  }

  // 3. Initialize Skills Constellation
  if (typeof window.initSkillsConstellation === 'function') {
    window.initSkillsConstellation();
  }

  // 4. Initialize Protosem Journal Manager
  if (typeof window.JournalManager === 'function') {
    window.journalInstance = new window.JournalManager();
  }

  // 5. Initialize General Interactions (Lightbox, Modals, Progress)
  if (typeof window.initInteractions === 'function') {
    window.initInteractions();
  }

  // Log confirmation
  console.log("✦ 'Live with the Question' Portfolio Initialized successfully.");
});
