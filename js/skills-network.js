/* ==========================================================================
   SKILLS CONSTELLATION NETWORK
   Center: ME -> Connected to Core Competencies and Modern Tools
   ========================================================================== */

const SkillDetailsData = {
  "RESEARCH": {
    category: "Core Competency",
    desc: "Asking the right questions, breaking down complex industries, analyzing value chains, and understanding foundational business mechanics.",
    tags: ["Market Inquiry", "Value Chain Mapping", "Case Study Synthesis"]
  },
  "LEADERSHIP": {
    category: "Core Competency",
    desc: "Demonstrated through student leadership, organizing school sports events, and heading initiatives as Joint Secretary of the Ethics & Values Vertical.",
    tags: ["Student Lead", "Joint Secretary", "Initiative Driving"]
  },
  "COMMUNICATION": {
    category: "Core Competency",
    desc: "Articulating ideas clearly, facilitating cross-functional discussions, and presenting structured insights to peers, faculty, and industry leaders.",
    tags: ["Tech Talks", "Presentations", "Team Dialogues"]
  },
  "TEAMWORK": {
    category: "Core Competency",
    desc: "Collaborating with diverse peers during Protosem challenges (e.g. Spaghetti Tower challenge, Design Thinking sprints) and cross-vertical initiatives.",
    tags: ["Interdisciplinary", "Consensus Building", "Sprints"]
  },
  "PROBLEM SOLVING": {
    category: "Core Competency",
    desc: "Approaching challenges with a 'Live with the Question' mindset, identifying root causes, and iterating until a solution is viable and practical.",
    tags: ["Root Cause Analysis", "Design Thinking", "Iterative Testing"]
  },
  "CRITICAL THINKING": {
    category: "Core Competency",
    desc: "Evaluating assumptions, examining multiple perspectives, and questioning surface-level assertions in business and society.",
    tags: ["Assumption Testing", "Ethical Deliberation", "Logic"]
  },
  "CREATIVITY": {
    category: "Core Competency",
    desc: "Unconventional idea generation inspired by the IDEO philosophy: 'The idea can be unconventional. The solution has to work.'",
    tags: ["IDEO Approach", "Lateral Thinking", "Visual Storytelling"]
  },
  "EVENT MANAGEMENT": {
    category: "Core Competency",
    desc: "End-to-end planning, logistics, coordination, and execution of campus-wide events like Crack the Case, Ethics Escape Room, Gratitude Day, and CARE 360.",
    tags: ["Event Logistics", "4-Stage Flow", "Crisis Handling"]
  },
  "PRESENTATION": {
    category: "Core Competency",
    desc: "Crafting visually compelling decks, delivering Tech Talks, and articulating complex findings like the Ethnic Wear value chain research.",
    tags: ["Deck Design", "Public Speaking", "Visual Synthesis"]
  },
  "BUSINESS ANALYSIS": {
    category: "Core Competency",
    desc: "Applying BBA frameworks across management, accounting, economics, marketing, and business law to real-world industrial contexts.",
    tags: ["Operations Flow", "Cost Intermediaries", "Market Dynamics"]
  },
  "MICROSOFT EXCEL": {
    category: "Tool & Analytics",
    desc: "Structured data modeling, financial analysis, quantitative techniques, and operational inventory tracking.",
    tags: ["Data Modeling", "Spreadsheets", "Formulas"]
  },
  "POWER BI": {
    category: "Tool & Analytics",
    desc: "Interactive dashboard creation, visual intelligence, and converting raw datasets into executive insights.",
    tags: ["Dashboards", "Visual Analytics", "Data Exploration"]
  },
  "AI TOOLS": {
    category: "Tool & Technology",
    desc: "Effective prompt engineering, context framing, clarity of instruction, and leveraging AI models for research and synthesis.",
    tags: ["Prompt Engineering", "Context Framing", "Research Synthesis"]
  },
  "ANTIGRAVITY": {
    category: "Tool & Platform",
    desc: "Agentic AI development, building modern bespoke web applications and crafting interactive personal storytelling platforms.",
    tags: ["Agentic AI", "Web Development", "Interactive UI"]
  },
  "PRESENTATION/DESIGN TOOLS": {
    category: "Tool & Creative",
    desc: "Editorial layout creation, visual poster design for sector analysis, and high-impact presentation deck crafting.",
    tags: ["Poster Design", "Editorial Styling", "Visual Communication"]
  }
};

function initSkillsConstellation() {
  const bubbles = document.querySelectorAll('.skill-node-bubble');
  const modalDescBox = document.getElementById('skill-detail-drawer');
  const skillTitle = document.getElementById('skill-active-title');
  const skillCategory = document.getElementById('skill-active-category');
  const skillDesc = document.getElementById('skill-active-desc');
  const skillTags = document.getElementById('skill-active-tags');

  if (bubbles.length) {
    bubbles.forEach(bubble => {
      bubble.addEventListener('click', () => {
        bubbles.forEach(b => b.classList.remove('selected'));
        bubble.classList.add('selected');

        const key = bubble.getAttribute('data-skill-name');
        const data = SkillDetailsData[key];
        if (data && modalDescBox && skillTitle) {
          skillTitle.textContent = key;
          skillCategory.textContent = data.category;
          skillDesc.textContent = data.desc;
          skillTags.innerHTML = data.tags.map(t => `<span class="chain-tag">${t}</span>`).join('');
          modalDescBox.style.display = 'block';
        }
      });
    });
  }
}

window.initSkillsConstellation = initSkillsConstellation;
