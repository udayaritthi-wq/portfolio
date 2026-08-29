/* ==========================================================================
   INTERACTIVE VALUE CHAINS & SUPPLY CHAIN SIMULATOR
   1. Arvind Chettinad Snacks (Operations & Supply Chain)
   2. Indian Traditional Wear & Textile Industry (Value Chain & Research)
   ========================================================================== */

const SnacksChainData = {
  raw: {
    num: "STAGE 01",
    title: "Raw Materials & Inventory Management",
    desc: "Rigorous sourcing of agricultural ingredients, rice flours, pulses, spices, and cooking oils. Focus on strict FIFO (First-In, First-Out) inventory principles, stock turnover monitoring, and raw materials handling to ensure pristine ingredient freshness.",
    tags: ["FIFO Strategy", "Raw Ingredient Sourcing", "Stock Control", "Material Handling"]
  },
  production: {
    num: "STAGE 02",
    title: "Batch Production & Processing",
    desc: "Hands-on exposure to commercial batch processing, industrial dough preparation, extruders, high-capacity temperature-controlled frying units, and continuous production flow line coordination.",
    tags: ["Batch Processing", "Industrial Frying", "Machinery Operation", "Throughput Optimization"]
  },
  quality: {
    num: "STAGE 03",
    title: "Quality Control & Hygiene Standards",
    desc: "Systematic sampling for texture, moisture content, oil absorption, and taste consistency. Enforcing workplace safety, hygiene guidelines, and food safety compliance across all production lines.",
    tags: ["Quality Assurance", "Moisture/Oil Checks", "Safety Compliance", "Hygiene Protocols"]
  },
  packaging: {
    num: "STAGE 04",
    title: "Automated Packaging & Nitrogen Flushing",
    desc: "Secondary processing and unit packaging using form-fill-seal machinery, batch coding for traceability, nitrogen-flushed pouching for shelf-life extension, and carton palletizing.",
    tags: ["Unit Packaging", "Shelf-Life Extension", "Batch Coding", "Palletizing"]
  },
  transportation: {
    num: "STAGE 05",
    title: "Logistics & Transportation Flow",
    desc: "Coordinating dispatch schedules, route planning, transit protection to prevent product breakage, and synchronized delivery to regional hubs and wholesale distribution points.",
    tags: ["Fleet Dispatch", "Route Management", "Transit Protection", "Regional Logistics"]
  },
  retail: {
    num: "STAGE 06",
    title: "Retail Distribution & Consumer Reach",
    desc: "Channel placement across traditional kirana networks, modern supermarkets, and specialty food outlets. Gathering feedback on consumer buying behavior, shelf visibility, and seasonal demand peaks.",
    tags: ["Retail Placement", "Kirana Network", "Consumer Demand", "Merchandising"]
  }
};

const TextileChainData = {
  cotton: {
    num: "STAGE 01",
    title: "Cotton Sourcing & Raw Fibre",
    desc: "The value chain starts at the agricultural base with cotton harvesting, grading staple length, fibre strength evaluation, and initial mandi pricing dynamics.",
    tags: ["Raw Cotton", "Staple Length", "Mandi Pricing", "Agricultural Sourcing"]
  },
  processing: {
    num: "STAGE 02",
    title: "Ginning & Fibre Processing",
    desc: "Separation of cotton fibres from cotton seeds, cleaning impurities, pressing into standard bales, and preparing uniform lint for spinning mills.",
    tags: ["Ginning Mills", "Seed Separation", "Baling", "Impurity Cleaning"]
  },
  spinning: {
    num: "STAGE 03",
    title: "Spinning & Yarn Production",
    desc: "Transforming raw fibre into continuous yarn counts (carded & combed yarns), rotor spinning, and ring spinning for diverse ethnic-wear weave requirements.",
    tags: ["Ring Spinning", "Yarn Counts", "Tensile Strength", "Twist per Inch"]
  },
  weaving: {
    num: "STAGE 04",
    title: "Weaving, Handloom & Knitting",
    desc: "Interlacing warp and weft yarns. Encompasses both traditional decentralized handloom clusters (rich heritage silks & cottons) and modern high-speed powerloom units.",
    tags: ["Handloom Clusters", "Powerloom Units", "Warp & Weft", "Heritage Weaves"]
  },
  manufacturing: {
    num: "STAGE 05",
    title: "Garmenting, Dyeing & Embellishment",
    desc: "Fabric processing (bleaching, natural & reactive dyeing, block printing, embroidery/zari work), precision cutting, stitching, and finishing into ethnic wear silhouettes.",
    tags: ["Zari & Embroidery", "Natural Dyeing", "Garment Finishing", "Craftsmanship"]
  },
  brands: {
    num: "STAGE 06",
    title: "Brand Players & Design Houses",
    desc: "Organized ethnic-wear brands and design labels bridging traditional craftsmanship with contemporary retail lines, managing brand equity and collections.",
    tags: ["Brand Portfolios", "Seasonal Collections", "Market Positioning", "Turnover Growth"]
  },
  retail: {
    num: "STAGE 07",
    title: "Retail Outlets & Omnichannel Distribution",
    desc: "Exclusive Brand Outlets (EBOs), Multi-Brand Outlets (MBOs), wedding destination stores, and e-commerce platforms optimizing consumer footfalls.",
    tags: ["EBOs & MBOs", "Omnichannel", "Merchandising", "Wedding Retail"]
  },
  consumer: {
    num: "STAGE 08",
    title: "End Consumer & Cultural Value",
    desc: "The final touchpoint where traditional wear fulfills celebratory, festival, and everyday cultural resonance, driving the complete economic engine back to the roots.",
    tags: ["Cultural Resonance", "Consumer Sentiment", "Value Realization", "Repeat Purchases"]
  }
};

function initValueChains() {
  // Initialize Snacks Chain
  const snacksNodes = document.querySelectorAll('#snacks-chain-flow .chain-node');
  const snacksTitle = document.getElementById('snacks-detail-title');
  const snacksDesc = document.getElementById('snacks-detail-desc');
  const snacksTags = document.getElementById('snacks-detail-tags');
  const snacksNum = document.getElementById('snacks-detail-num');

  if (snacksNodes.length && snacksTitle) {
    snacksNodes.forEach(node => {
      node.addEventListener('click', () => {
        snacksNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const key = node.getAttribute('data-stage');
        const data = SnacksChainData[key];
        if (data) {
          if (snacksNum) snacksNum.textContent = data.num;
          snacksTitle.textContent = data.title;
          snacksDesc.textContent = data.desc;
          if (snacksTags) {
            snacksTags.innerHTML = data.tags.map(t => `<span class="chain-tag">${t}</span>`).join('');
          }
        }
      });
    });
  }

  // Initialize Textile Chain
  const textileNodes = document.querySelectorAll('#textile-chain-flow .chain-node');
  const textileTitle = document.getElementById('textile-detail-title');
  const textileDesc = document.getElementById('textile-detail-desc');
  const textileTags = document.getElementById('textile-detail-tags');
  const textileNum = document.getElementById('textile-detail-num');

  if (textileNodes.length && textileTitle) {
    textileNodes.forEach(node => {
      node.addEventListener('click', () => {
        textileNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');

        const key = node.getAttribute('data-stage');
        const data = TextileChainData[key];
        if (data) {
          if (textileNum) textileNum.textContent = data.num;
          textileTitle.textContent = data.title;
          textileDesc.textContent = data.desc;
          if (textileTags) {
            textileTags.innerHTML = data.tags.map(t => `<span class="chain-tag">${t}</span>`).join('');
          }
        }
      });
    });
  }
}

window.initValueChains = initValueChains;
