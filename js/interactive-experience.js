/* ==========================================================================
   INTERACTIVE EXPERIENCE ENGINE: “LIVE WITH THE QUESTION”
   Features:
   1. 7 Hidden Questions Easter Egg & Tracker State Machine
   2. Contextual Pop-of-Colour Discovery Notifications
   3. 7/7 Staggered Unlock Celebration & Beyond the Resume Drawer
   4. Minimalist XO (Tic-Tac-Toe) Easter Egg Game with AI & In-Game Commentary
   5. Morphing Final Bottom Glyph
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'uday_portfolio_questions_found';
  const TOTAL_QUESTIONS = 7;

  const DISCOVERY_MESSAGES = [
    "Look closer.",
    "Good question.",
    "Keep going.",
    "There is more beneath the surface."
  ];

  const COMMENTARY_MESSAGES = [
    "Interesting choice.",
    "You thought ahead.",
    "Try another way.",
    "A question of angles.",
    "Curiosity at play."
  ];

  class QuestionQuestManager {
    constructor() {
      this.foundQuestions = this.loadSavedState();
      this.msgIndex = 0;
      this.init();
    }

    loadSavedState() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.foundQuestions));
      } catch (e) {
        console.warn("Could not persist question state", e);
      }
    }

    init() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    }

    cacheDOM() {
      this.introTrackers = document.querySelectorAll('.quest-tracker-counter');
      this.floatingDock = document.getElementById('quest-floating-dock');
      this.dockScore = document.getElementById('dock-score-val');
      this.dockDots = document.querySelectorAll('.dock-dot');
      this.dockUnlockBtn = document.getElementById('dock-unlock-cta');
      this.guideModal = document.getElementById('quest-guide-modal');
      this.unlockOverlay = document.getElementById('quest-unlocked-overlay');
      this.unlockDiscoverBtn = document.getElementById('unlock-discover-btn');
      this.unlockSkipBtn = document.getElementById('unlock-skip-btn');
      this.questionNodes = document.querySelectorAll('.hidden-question-mark');
      this.beyondSection = document.getElementById('beyond-the-resume');
    }

    bindEvents() {
      // Question marks discovery click
      this.questionNodes.forEach(node => {
        node.addEventListener('click', (e) => {
          e.preventDefault();
          const qId = node.getAttribute('data-question-id');
          this.discoverQuestion(qId, node);
        });
      });

      // Floating dock toggle guide
      if (this.floatingDock) {
        this.floatingDock.addEventListener('click', (e) => {
          if (e.target.closest('#dock-unlock-cta')) {
            this.showUnlockOverlay();
            return;
          }
          if (this.guideModal) {
            this.guideModal.classList.toggle('open');
          }
        });
      }

      // Close guide modal on clicking outside
      document.addEventListener('click', (e) => {
        if (this.guideModal && this.guideModal.classList.contains('open')) {
          if (!this.guideModal.contains(e.target) && !this.floatingDock.contains(e.target)) {
            this.guideModal.classList.remove('open');
          }
        }
      });

      // Guide modal close button
      const guideClose = document.getElementById('quest-guide-close-btn');
      if (guideClose) {
        guideClose.addEventListener('click', () => {
          if (this.guideModal) this.guideModal.classList.remove('open');
        });
      }

      // Unlock modal actions
      if (this.unlockDiscoverBtn) {
        this.unlockDiscoverBtn.addEventListener('click', () => {
          this.hideUnlockOverlay();
          if (this.beyondSection) {
            this.beyondSection.style.display = 'block';
            this.beyondSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }

      if (this.unlockSkipBtn) {
        this.unlockSkipBtn.addEventListener('click', () => {
          this.hideUnlockOverlay();
        });
      }

      // Start Exploring Banner button smooth scroll to About
      const startBtn = document.getElementById('quest-start-btn');
      if (startBtn) {
        startBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const aboutSec = document.getElementById('about');
          if (aboutSec) {
            aboutSec.scrollIntoView({ behavior: 'smooth' });
            this.showPopup("Search the chapters carefully.", "QUEST STARTED");
          }
        });
      }
    }

    discoverQuestion(qId, element) {
      if (!qId) return;

      const isNew = !this.foundQuestions.includes(qId);
      if (isNew) {
        this.foundQuestions.push(qId);
        this.saveState();
      }

      // Visual transformation
      if (element) {
        element.classList.add('discovered');
        element.style.transform = 'scale(1.3) rotate(8deg)';
        setTimeout(() => {
          element.style.transform = '';
        }, 400);
      }

      // Discovery notification
      const msg = DISCOVERY_MESSAGES[this.msgIndex % DISCOVERY_MESSAGES.length];
      this.msgIndex++;
      this.showPopup(msg, isNew ? "QUESTION FOUND" : "ALREADY DISCOVERED");

      this.render();

      // Check if unlocked all 7
      if (this.foundQuestions.length === TOTAL_QUESTIONS && isNew) {
        setTimeout(() => {
          this.showUnlockOverlay();
        }, 1200);
      }
    }

    showPopup(msg, title) {
      let toast = document.getElementById('discovery-popup-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'discovery-popup-toast';
        toast.className = 'discovery-popup-toast';
        toast.innerHTML = `
          <div class="discovery-popup-icon">?</div>
          <div>
            <div class="discovery-popup-title" id="discovery-toast-title">QUESTION FOUND</div>
            <div class="discovery-popup-msg" id="discovery-toast-msg">Look closer.</div>
          </div>
        `;
        document.body.appendChild(toast);
      }

      const titleEl = document.getElementById('discovery-toast-title');
      const msgEl = document.getElementById('discovery-toast-msg');

      if (titleEl) titleEl.textContent = title || "QUESTION FOUND";
      if (msgEl) msgEl.textContent = `“${msg}”`;

      toast.classList.add('show');
      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    showUnlockOverlay() {
      if (this.unlockOverlay) {
        this.unlockOverlay.classList.add('open');
      }
    }

    hideUnlockOverlay() {
      if (this.unlockOverlay) {
        this.unlockOverlay.classList.remove('open');
      }
    }

    render() {
      const count = this.foundQuestions.length;

      // Update text counters
      this.introTrackers.forEach(el => {
        el.textContent = `${count} / ${TOTAL_QUESTIONS}`;
      });

      if (this.dockScore) {
        this.dockScore.innerHTML = `<span class="score-num">${count}</span> / ${TOTAL_QUESTIONS}`;
      }

      // Update dots
      this.dockDots.forEach((dot, idx) => {
        if (idx < count) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      // Update mark nodes
      this.questionNodes.forEach(node => {
        const id = node.getAttribute('data-question-id');
        if (this.foundQuestions.includes(id)) {
          node.classList.add('discovered');
        }
      });

      // Update guide list
      this.foundQuestions.forEach(id => {
        const item = document.querySelector(`.quest-item[data-target-q="${id}"]`);
        if (item) {
          item.classList.add('found');
          const status = item.querySelector('.item-status');
          if (status) status.textContent = 'FOUND ✓';
        }
      });

      // Show/Hide unlock button on dock
      if (this.dockUnlockBtn) {
        if (count >= TOTAL_QUESTIONS) {
          this.dockUnlockBtn.style.display = 'inline-block';
        } else {
          this.dockUnlockBtn.style.display = 'none';
        }
      }

      // If already solved, enable beyond section
      if (count >= TOTAL_QUESTIONS && this.beyondSection) {
        this.beyondSection.style.display = 'block';
      }
    }

    resetQuest() {
      this.foundQuestions = [];
      this.saveState();
      this.questionNodes.forEach(n => n.classList.remove('discovered'));
      document.querySelectorAll('.quest-item').forEach(i => {
        i.classList.remove('found');
        const s = i.querySelector('.item-status');
        if (s) s.textContent = 'HIDDEN';
      });
      this.render();
      this.showPopup("You can explore and find them again.", "QUEST RESET");
    }
  }

  /* --------------------------------------------------------------------------
     XO / TIC-TAC-TOE EASTER EGG ENGINE
     -------------------------------------------------------------------------- */
  class XOGame {
    constructor() {
      this.board = Array(9).fill(null);
      this.humanPlayer = 'X';
      this.aiPlayer = 'O';
      this.currentPlayer = 'X';
      this.isGameOver = false;
      this.winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
        [0, 4, 8], [2, 4, 6]             // Diagonals
      ];

      this.cacheDOM();
      this.bindEvents();
    }

    cacheDOM() {
      this.introWrap = document.getElementById('xo-intro-wrap');
      this.playBtn = document.getElementById('xo-play-trigger-btn');
      this.gameArea = document.getElementById('xo-gameplay-area');
      this.boardCells = document.querySelectorAll('.xo-cell');
      this.turnIndicator = document.getElementById('xo-turn-indicator');
      this.liveCommentary = document.getElementById('xo-live-commentary');
      this.resultOverlay = document.getElementById('xo-result-overlay');
      this.resultTitle = document.getElementById('xo-result-title');
      this.resultDesc = document.getElementById('xo-result-desc');
      this.restartBtn = document.getElementById('xo-restart-btn');
      this.exploreMoreBtn = document.getElementById('xo-keep-exploring-btn');
    }

    bindEvents() {
      if (this.playBtn) {
        this.playBtn.addEventListener('click', () => {
          if (this.introWrap) this.introWrap.style.display = 'none';
          if (this.gameArea) this.gameArea.classList.add('active');
          this.startNewGame();
        });
      }

      this.boardCells.forEach(cell => {
        cell.addEventListener('click', () => {
          const index = parseInt(cell.getAttribute('data-index'), 10);
          this.handleCellClick(index);
        });
      });

      if (this.restartBtn) {
        this.restartBtn.addEventListener('click', () => {
          this.startNewGame();
        });
      }

      if (this.exploreMoreBtn) {
        this.exploreMoreBtn.addEventListener('click', () => {
          const hero = document.getElementById('hero');
          if (hero) hero.scrollIntoView({ behavior: 'smooth' });
        });
      }
    }

    startNewGame() {
      this.board = Array(9).fill(null);
      this.currentPlayer = this.humanPlayer;
      this.isGameOver = false;

      this.boardCells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'xo-cell';
      });

      if (this.resultOverlay) this.resultOverlay.classList.remove('active');
      if (this.turnIndicator) this.turnIndicator.textContent = "YOUR TURN (X)";
      if (this.liveCommentary) this.liveCommentary.textContent = "“A quick game of XO. No pressure. Just curiosity.”";
    }

    handleCellClick(index) {
      if (this.isGameOver || this.board[index] !== null || this.currentPlayer !== this.humanPlayer) {
        return;
      }

      this.makeMove(index, this.humanPlayer);

      if (this.checkGameState()) return;

      // AI turn after small humanized delay
      this.currentPlayer = this.aiPlayer;
      if (this.turnIndicator) this.turnIndicator.textContent = "EXPLORING MOVE (O)...";
      this.setRandomCommentary();

      setTimeout(() => {
        if (!this.isGameOver) {
          const aiMove = this.getBestMove();
          this.makeMove(aiMove, this.aiPlayer);
          if (!this.checkGameState()) {
            this.currentPlayer = this.humanPlayer;
            if (this.turnIndicator) this.turnIndicator.textContent = "YOUR TURN (X)";
          }
        }
      }, 500);
    }

    makeMove(index, player) {
      this.board[index] = player;
      const cell = document.querySelector(`.xo-cell[data-index="${index}"]`);
      if (cell) {
        cell.textContent = player;
        cell.classList.add(player === 'X' ? 'cell-x' : 'cell-o', 'occupied');
      }
    }

    setRandomCommentary() {
      if (this.liveCommentary) {
        const rand = COMMENTARY_MESSAGES[Math.floor(Math.random() * COMMENTARY_MESSAGES.length)];
        this.liveCommentary.textContent = `“${rand}”`;
      }
    }

    checkWinner(board) {
      for (const combo of this.winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return { winner: board[a], combo };
        }
      }
      if (board.every(cell => cell !== null)) {
        return { winner: 'draw', combo: null };
      }
      return null;
    }

    checkGameState() {
      const result = this.checkWinner(this.board);
      if (!result) return false;

      this.isGameOver = true;

      if (result.combo) {
        result.combo.forEach(idx => {
          const cell = document.querySelector(`.xo-cell[data-index="${idx}"]`);
          if (cell) cell.classList.add('win-highlight');
        });
      }

      if (this.resultOverlay) this.resultOverlay.classList.add('active');

      if (result.winner === this.humanPlayer) {
        if (this.resultTitle) this.resultTitle.textContent = "YOU WIN.";
        if (this.resultDesc) this.resultDesc.textContent = "“Curiosity looks good on you.”";
        if (this.turnIndicator) this.turnIndicator.textContent = "GAME OVER — YOU WON";
      } else if (result.winner === this.aiPlayer) {
        if (this.resultTitle) this.resultTitle.textContent = "NOT THIS TIME.";
        if (this.resultDesc) this.resultDesc.textContent = "“Not every answer comes on the first try.”";
        if (this.turnIndicator) this.turnIndicator.textContent = "GAME OVER — AI WON";
      } else {
        if (this.resultTitle) this.resultTitle.textContent = "A DRAW.";
        if (this.resultDesc) this.resultDesc.textContent = "“Sometimes there isn't one obvious answer.”";
        if (this.turnIndicator) this.turnIndicator.textContent = "GAME OVER — TIED";
      }

      return true;
    }

    // Minimax AI with slight exploratory variety
    getBestMove() {
      const availableMoves = this.board
        .map((val, idx) => (val === null ? idx : null))
        .filter(val => val !== null);

      // Check if AI can win immediately
      for (const move of availableMoves) {
        const tempBoard = [...this.board];
        tempBoard[move] = this.aiPlayer;
        if (this.checkWinner(tempBoard)?.winner === this.aiPlayer) {
          return move;
        }
      }

      // Check if Human can win and block
      for (const move of availableMoves) {
        const tempBoard = [...this.board];
        tempBoard[move] = this.humanPlayer;
        if (this.checkWinner(tempBoard)?.winner === this.humanPlayer) {
          return move;
        }
      }

      // Take center if free
      if (this.board[4] === null) return 4;

      // Strategic corners
      const corners = [0, 2, 6, 8].filter(idx => this.board[idx] === null);
      if (corners.length > 0 && Math.random() > 0.3) {
        return corners[Math.floor(Math.random() * corners.length)];
      }

      // Otherwise pick any available
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }
  }

  /* --------------------------------------------------------------------------
     FINAL OVERSIZED BOTTOM QUESTION MARK MORPH
     -------------------------------------------------------------------------- */
  function initFinalBottomQuestion() {
    const wrapper = document.getElementById('final-morph-wrapper');
    if (!wrapper) return;

    wrapper.addEventListener('click', () => {
      wrapper.classList.toggle('morphed');
      const caption = wrapper.querySelector('.final-morph-caption');
      if (caption) {
        caption.textContent = "“What's your next question?”";
      }
      if (window.showToast) {
        window.showToast("✦ Question → Exploration → Discovery.");
      }
    });
  }

  // Initialize all interactive experiences on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    window.questManager = new QuestionQuestManager();
    window.xoGame = new XOGame();
    initFinalBottomQuestion();

    // Attach reset helper to window for easy access
    window.resetQuestionQuest = () => window.questManager.resetQuest();
  });
})();
