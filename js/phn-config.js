/**
 * ============================================================
 *  PetHealthNotes — Master Affiliate Link Registry
 *  js/phn-config.js
 * ============================================================
 *
 *  ⚠️  THIS IS THE SINGLE FILE FOR ALL DYNAMIC SITE CONTENT.
 *      Never hardcode any URL, form ID, or promo text in HTML.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HOW .COM AND .IN LINKS WORK
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 *  EVERY product has:
 *    url   → Default URL  (Amazon.com — shown to US, CA, AU,
 *                          and all countries WITHOUT a geo entry)
 *    geo   → Country overrides
 *              "IN": { url: "amazon.in link" }   ← India affiliate
 *              "GB": { url: "amazon.co.uk link" } ← UK affiliate
 *
 *  RESOLUTION ORDER (injector checks top to bottom):
 *    1. User's country in geo:{} → use that country's URL
 *    2. No match → fall back to default url (amazon.com)
 *
 *  EXAMPLE:
 *    User from India → sees amazon.in link  → earns IN commission
 *    User from US    → sees amazon.com link → earns COM commission
 *    User from Japan → sees amazon.com link → earns COM commission
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  HOW TO ADD A NEW LINK (works for any number, 60+)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 *  Step 1: Pick a key (lowercase, hyphens only, no spaces)
 *          e.g.  "flea-collar"
 *
 *  Step 2: Add to the right CATEGORY section below:
 *
 *    "flea-collar": {
 *      priority: 1,                          // 1=Primary, 2=Secondary, 3=Upsell
 *      text:  "🦟 Seresto Flea & Tick Collar",
 *      badge: "Best Seller",                 // or null
 *      url:   "https://amzn.to/COMLINK",     // ← Amazon.COM affiliate link
 *      geo: {
 *        "IN": { url: "https://amzn.in/d/INLINK" },  // ← Amazon.IN affiliate link
 *        "GB": { url: "https://amzn.eu/d/UKLINK" },  // ← Amazon.UK affiliate link
 *      }
 *    },
 *
 *  Step 3: In any article HTML, place:
 *          <a data-affiliate="flea-collar" href="#">Loading...</a>
 *
 *  Step 4: Commit only this file + push → all articles update live.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *  PRIORITY GUIDE (for up to 60 links per article slot)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 *  priority: 1  → PRIMARY  — shown first / hero placement in article
 *  priority: 2  → SECONDARY — shown in product comparison tables
 *  priority: 3  → UPSELL   — shown in "You might also like" blocks
 *
 *  The injector uses priority to:
 *    - Auto-fill multi-product blocks (data-affiliate-list="joint-health")
 *    - Pick the best link when a slot has multiple candidates
 *    - Fall back from P1 → P2 → P3 if a URL is ever flagged broken
 *
 * ============================================================
 */

window.PHN = {

  // ══════════════════════════════════════════════════════════
  //  AFFILIATE LINKS  (organized by category)
  //  Add new products under the right category.
  //  No limit on number of entries.
  // ══════════════════════════════════════════════════════════
  affiliates: {

    // ── CATEGORY: JOINT & MOBILITY ──────────────────────────
    "joint-supplements": {
      priority: 1,
      text:  "💊 Dasuquin Advanced Joint Supplement",
      badge: "Vet Recommended",
      url:   "https://amzn.to/4ehu1aW",           // ← .com link
      geo: {
        "IN": { url: "https://amzn.in/d/REPLACE_ME" }, // ← paste .in link here
        // "GB": { url: "https://amzn.eu/d/REPLACE_ME" },
      }
    },
    "joint-support-chews": {
      priority: 2,
      text:  "💊 Nutramax Cosequin DS Chews",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_cosequin",  // ← ⚠️ PASTE real Cosequin .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_cosequin" }, // ← ⚠️ PASTE real .in link
      }
    },
    "orthopedic-bed": {
      priority: 2,
      text:  "🛌 Big Barker Orthopedic Dog Bed",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_bigbarker",  // ← ⚠️ PASTE real Big Barker .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_bigbarker" }, // ← ⚠️ PASTE real .in link
      }
    },

    // ── CATEGORY: SMART TECH & MONITORING ───────────────────
    "smart-collar": {
      priority: 1,
      text:  "📡 Fi Series 3 Smart Dog Collar",
      badge: "Top Rated",
      url:   "https://amzn.to/4o1oloK",           // ← .com link
      geo: {
        "IN": { url: "https://amzn.in/d/REPLACE_ME", text: "📡 Wagr Smart Pet GPS Collar" },
      }
    },
    "gps-pet-tracker": {
      priority: 2,
      text:  "📍 Tractive GPS Dog Tracker",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_tractive",  // ← ⚠️ PASTE real Tractive GPS .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_tractive" }, // ← ⚠️ PASTE real .in link
      }
    },

    // ── CATEGORY: FEEDING & NUTRITION ───────────────────────
    "automated-feeder": {
      priority: 1,
      text:  "🍽️ PetSafe Smart Feed Automatic Feeder",
      badge: "Best Seller",
      url:   "https://amzn.to/3SfOcxi",           // ← .com link
      geo: {
        "IN": { url: "https://amzn.in/d/REPLACE_ME" },
      }
    },
    "omega-3-fish-oil": {
      priority: 1,
      text:  "🐟 Zesty Paws Omega-3 Fish Oil for Dogs",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_omega3",  // ← ⚠️ PASTE real Zesty Paws .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_omega3" }, // ← ⚠️ PASTE real .in link
      }
    },
    "probiotics-for-dogs": {
      priority: 2,
      text:  "🦠 Purina FortiFlora Probiotic for Dogs",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_fortiflora",  // ← ⚠️ PASTE real FortiFlora .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_fortiflora" }, // ← ⚠️ PASTE real .in link
      }
    },

    // ── CATEGORY: HEALTH & WELLNESS ─────────────────────────
    "cooling-vest": {
      priority: 1,
      text:  "🧊 Ruffwear Swamp Cooler Vest",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_coolingvest",  // ← ⚠️ PASTE real Ruffwear .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_coolingvest" }, // ← ⚠️ PASTE real .in link
      }
    },
    "flea-collar": {
      priority: 1,
      text:  "🦟 Seresto Flea & Tick Collar",
      badge: "Best Seller",
      url:   "https://amzn.to/NEEDS_REAL_LINK_seresto",  // ← ⚠️ PASTE real Seresto .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_seresto" }, // ← ⚠️ PASTE real .in link
      }
    },

    // ── CATEGORY: GROOMING ──────────────────────────────────
    "nail-grinder": {
      priority: 2,
      text:  "✂️ Dremel 7300-PT Pet Nail Grooming",
      badge: null,
      url:   "https://amzn.to/NEEDS_REAL_LINK_dremel",  // ← ⚠️ PASTE real Dremel .com affiliate link
      geo: {
        "IN": { url: "https://amzn.in/d/NEEDS_REAL_LINK_dremel" }, // ← ⚠️ PASTE real .in link
      }
    },

    // ── ADD NEW PRODUCTS BELOW THIS LINE ────────────────────
    // Copy this template:
    //
    // "your-product-key": {
    //   priority: 1,                           // 1, 2, or 3
    //   text:  "🛒 Your Product Name Here",
    //   badge: "Best Seller",                  // or null
    //   url:   "https://amzn.to/XXXXXXX",      // ← Amazon.COM link
    //   geo: {
    //     "IN": { url: "https://amzn.in/d/XXXXXXX" }, // ← Amazon.IN link
    //     "GB": { url: "https://amzn.eu/d/XXXXXXX" }, // ← Amazon.UK link
    //   }
    // },

  },

  // ══════════════════════════════════════════════════════════
  //  GEO STORE LABELS  (display only — no logic)
  // ══════════════════════════════════════════════════════════
  geoStoreLabels: {
    "US": "amazon.com",
    "IN": "amazon.in",
    "GB": "amazon.co.uk",
    "DE": "amazon.de",
    "FR": "amazon.fr",
    "IT": "amazon.it",
    "CA": "amazon.ca",
    "AU": "amazon.com.au",
  },

  // ══════════════════════════════════════════════════════════
  //  PROMO BANNER (Bribe-to-Buy Sticky Bar)
  // ══════════════════════════════════════════════════════════
  promos: {
    "bribe-bar": {
      enabled:      true,
      type:         "form",
      text:         "🎁 Get our Free Dog Health Starter Kit (Checklists & Emergency Cheatsheets) →",
      cta:          "Send Me The Kit",
      url:          "https://app.kit.com/forms/9511956/subscriptions",
      triggerOnUtm: false,   // show to everyone to build email list
    }
  },

  // ══════════════════════════════════════════════════════════
  //  LEAD MAGNETS
  // ══════════════════════════════════════════════════════════
  leadMagnets: {
    "senior-dog": {
      icon:      "🐾",
      title:     "Don't Wait Until It's an Emergency",
      body:      "Get my free <strong>Senior Dog Hind Leg Weakness Checklist + Home Exercise Plan</strong> delivered to your inbox.",
      cta:       "Get Free Checklist",
      kitFormId: "9513548",
    },
    "general": {
      icon:      "📋",
      title:     "Get Our Free Pet Health Starter Kit",
      body:      "Join 2,000+ pet parents. Get our vet-reviewed <strong>Pet Health Essentials Checklist</strong> free.",
      cta:       "Send Me The Kit",
      kitFormId: "9489853",
    }
  },

  // ══════════════════════════════════════════════════════
  //  FORMS  (Submission endpoints — never hardcode in HTML)
  //
  //  "stories" → Uses Kit (you already have Kit — create a form in
  //              your Kit dashboard → Settings → Forms → New Form
  //              Copy the form ID (the number in the URL) and paste below)
  //
  //  "contact" → Uses Web3Forms (free, 250/month, no credit card)
  //              1. Go to https://web3forms.com
  //              2. Enter support@pethealthnotes.com → Get Access Key
  //              3. Check your email, copy the key, paste below
  //
  //  HOW TO ACTIVATE: Replace REPLACE_ME with your real IDs, commit only
  //  this file → push. Both forms go live instantly.
  // ══════════════════════════════════════════════════════
  forms: {
    "stories": {
      provider:  "kit",
      kitFormId: "9517306",   // ← Your Kit Story Submission form ID
      label:     "Share Your Story"
    },
    "contact": {
      provider:       "web3forms",
      web3formsKey:   "2bcbfa78-959e-4e41-9977-d1997d9099c1",  // ← From https://web3forms.com (free)
      // recipientEmail: Web3Forms sends to whatever email you register with.
      // OPTIONS (all free):
      //   A) Use your personal Gmail right now — just sign up to web3forms.com with it
      //   B) Get support@pethealthnotes.com FREE via Cloudflare Email Routing:
      //      dash.cloudflare.com → pethealthnotes.com → Email → Email Routing
      //      → Create Address → support → forward to your Gmail → done in 2 min
      label: "Contact Support"
    }
  },

  // ══════════════════════════════════════════════════════════
  //  SITE-WIDE DISCLAIMER
  // ══════════════════════════════════════════════════════════
  disclaimer: "The content on Pet Health Notes is for informational purposes only. Always consult your veterinarian. Pet Health Notes participates in the Amazon Associates affiliate program — we may earn a small commission if you purchase through our links, at no extra cost to you.",

};
