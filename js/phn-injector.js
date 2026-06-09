/**
 * ============================================================
 *  PetHealthNotes — Runtime Injector
 *  Reads window.PHN config and swaps all dynamic placeholders.
 *  Loaded on every page after phn-config.js.
 * ============================================================
 */
(function () {
  'use strict';

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    if (!window.PHN) {
      console.warn('[PHN] Config not loaded. Skipping injection.');
      return;
    }

    injectAffiliateLinks();
    injectLeadMagnets();
    injectPromos();
    injectDisclaimers();
    trackAffiliateClicks();
  }

  // ── 1. AFFILIATE LINKS ──────────────────────────────────────────────────
  function injectAffiliateLinks() {
    const country = localStorage.getItem('phn_geo') || '';
    const nodes = document.querySelectorAll('[data-affiliate]');

    nodes.forEach(function (el) {
      const key = el.getAttribute('data-affiliate');
      const product = PHN.affiliates[key];
      if (!product) return;

      // Geo resolution:
      // 1. Check per-product geo override (e.g. user is IN → use amazon.in link)
      // 2. Fall back to default URL (e.g. amazon.com)
      let url  = product.url;
      let text = product.text;

      const geoEntry = product.geo && product.geo[country];
      if (geoEntry) {
        url  = geoEntry.url;
        text = geoEntry.text || product.text; // allow country-specific label
      }

      el.href   = url;
      el.target = '_blank';
      el.rel    = 'noopener noreferrer nofollow';
      el.className = 'affiliate-product-btn';

      // Build inner HTML with optional badge
      let inner = text;
      if (product.badge) {
        inner += ` <span class="aff-badge">${product.badge}</span>`;
      }
      el.innerHTML = inner;
    });

    // Geo-detect once and cache for 24h
    if (!country) detectGeo();
  }

  function detectGeo() {
    fetch('https://ipapi.co/json/', { cache: 'force-cache' })
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.country_code) {
          localStorage.setItem('phn_geo', d.country_code);
        }
      })
      .catch(function () {}); // Silent fail
  }

  // ── 2. LEAD MAGNETS ─────────────────────────────────────────────────────
  function injectLeadMagnets() {
    const nodes = document.querySelectorAll('[data-lead-magnet]');
    nodes.forEach(function (el) {
      const key = el.getAttribute('data-lead-magnet');
      const lm = PHN.leadMagnets[key] || PHN.leadMagnets['general'];
      if (!lm) return;

      el.innerHTML = `
        <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:24px;border-radius:12px;margin:32px 0;">
          <div style="font-size:36px;margin-bottom:8px;">${lm.icon}</div>
          <h3 style="font-size:1.35rem;color:#0f172a;font-weight:700;margin-bottom:12px;margin-top:0;">${lm.title}</h3>
          <p style="color:#475569;margin-bottom:24px;line-height:1.6;">${lm.body}</p>
          <form action="https://app.kit.com/forms/${lm.kitFormId}/subscriptions" method="POST"
                style="display:flex;gap:10px;max-width:480px;margin:0 auto 16px;flex-wrap:wrap;">
            <input type="email" name="email_address" placeholder="Enter your email address..."
                   required style="flex:1;min-width:200px;padding:14px 16px;border:1px solid #cbd5e1;
                   border-radius:8px;font-size:1rem;outline:none;">
            <button type="submit"
                    style="background:#0284c7;color:#fff;padding:14px 28px;border-radius:8px;
                    font-weight:700;font-size:1rem;border:none;cursor:pointer;">${lm.cta}</button>
          </form>
        </div>`;
        
      // Attach Pinterest Server-Side CAPI tracking for Lead Magnets
      const form = el.querySelector('form');
      if (form) {
        form.addEventListener('submit', function(e) {
          const emailInput = form.querySelector('input[type="email"]');
          const email = emailInput ? emailInput.value : '';
          const isCatalog = window.location.search.includes('catalog=1') ? 'CATALOG' : 'STANDARD_AD';
          
          fetch('/api/pinterest', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              eventName: 'lead',
              email: email,
              contentName: lm.title || 'Lead Magnet',
              promotionType: isCatalog
            })
          }).catch(err => console.error('Pinterest CAPI Error:', err));
        });
      }
    });
  }

  // ── 3. PROMO BANNERS ────────────────────────────────────────────────────
  function injectPromos() {
    const bar = document.getElementById('bribeBar');
    if (!bar) return;

    const promo = PHN.promos['bribe-bar'];
    if (!promo || !promo.enabled) return;

    // Update content from config
    if (promo.type === 'form') {
      bar.innerHTML = `
        <div style="display:flex; justify-content:center; align-items:center; gap: 15px; flex-wrap:wrap;">
          <span>${promo.text}</span>
          <form action="${promo.url}" method="POST" style="display:flex; gap:8px; margin:0; align-items:center;">
            <input type="email" name="email_address" placeholder="Your email..." required style="padding:6px 10px; border-radius:4px; border:none; outline:none; font-size:0.9rem; width:200px; color:#333;">
            <button type="submit" style="background:#222; color:#fff; padding:6px 12px; border-radius:4px; border:none; font-weight:bold; cursor:pointer; font-size:0.9rem;">${promo.cta}</button>
          </form>
        </div>
      `;
    } else {
      bar.innerHTML = `${promo.text} <a href="${promo.url}" target="_blank">${promo.cta}</a>`;
    }

    // Show logic
    const isUtmTraffic = window.location.search.includes('utm_') ||
                         window.location.search.includes('ref=');
    if (!promo.triggerOnUtm || isUtmTraffic) {
      bar.style.display = 'block';
    }
  }

  // ── 4. DISCLAIMERS ──────────────────────────────────────────────────────
  function injectDisclaimers() {
    const nodes = document.querySelectorAll('[data-block="disclaimer"]');
    nodes.forEach(function (el) {
      el.textContent = PHN.disclaimer;
    });
  }

  // ── 5. GA4 AFFILIATE CLICK TRACKING ────────────────────────────────────
  function trackAffiliateClicks() {
    document.addEventListener('click', function (e) {
      const btn = e.target.closest('.affiliate-product-btn');
      if (!btn) return;
      const key = btn.getAttribute('data-affiliate') || btn.textContent.trim().substring(0, 30);
      if (window.gtag) {
        gtag('event', 'affiliate_click', {
          product_key: key,
          page_path: window.location.pathname
        });
      }

      // Pinterest Server-Side CAPI (SALES/Checkout Tracking)
      const isCatalog = window.location.search.includes('catalog=1') ? 'CATALOG' : 'STANDARD_AD';
      fetch('/api/pinterest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: 'checkout',
          contentName: key,
          promotionType: isCatalog
        })
      }).catch(err => console.error('Pinterest CAPI Error:', err));
    });
  }

})();
