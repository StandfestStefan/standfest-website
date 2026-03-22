/* ============================================
   STANDFEST DIGITAL — Cookie-Banner
   DSGVO + TKG 2003 § 165 konform
   GA4 wird NUR bei explizitem Consent geladen
   ============================================ */
(function () {
  'use strict';

  // ── Konfiguration ──
  var GA4_ID = 'G-4SGGPLWQMW';
  var STORAGE_KEY = 'sd_consent';
  var CONSENT_VERSION = 1; // Bei Änderung der Cookie-Kategorien hochzählen

  // ── Hilfsfunktionen ──
  function getConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (data.version !== CONSENT_VERSION) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function setConsent(analytics) {
    var data = {
      version: CONSENT_VERSION,
      analytics: analytics,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  // ── GA4 laden ──
  function loadGA4() {
    if (document.getElementById('ga4-script')) return;
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA4_ID, { anonymize_ip: true });

    var s = document.createElement('script');
    s.id = 'ga4-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
    document.head.appendChild(s);
  }

  // ── GA4 entfernen + Cookies löschen ──
  function removeGA4() {
    var s = document.getElementById('ga4-script');
    if (s) s.remove();
    window.dataLayer = undefined;
    window.gtag = undefined;

    // GA-Cookies löschen
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var name = cookies[i].split('=')[0].trim();
      if (name === '_ga' || name === '_gid' || name.indexOf('_ga_') === 0) {
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.' + location.hostname;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=' + location.hostname;
      }
    }
  }

  // ── Banner HTML + CSS ──
  function createBanner() {
    // CSS
    var style = document.createElement('style');
    style.textContent =
      '.cb-overlay{position:fixed;bottom:0;left:0;right:0;z-index:9999;padding:1rem;pointer-events:none;opacity:0;transform:translateY(20px);transition:opacity .4s ease,transform .4s ease}' +
      '.cb-overlay.cb-visible{opacity:1;transform:translateY(0);pointer-events:auto}' +
      '.cb-box{max-width:680px;margin:0 auto;background:var(--bg-card,#2a2e25);border:1px solid var(--border,rgba(255,255,255,.08));border-radius:var(--radius,12px);padding:1.5rem 1.75rem;box-shadow:0 8px 32px rgba(0,0,0,.3)}' +
      '.cb-text{color:var(--text-muted,#9a9890);font-size:.875rem;line-height:1.6;margin-bottom:1rem}' +
      '.cb-text a{color:var(--accent,#4a7c59);text-decoration:underline}' +
      '.cb-actions{display:flex;gap:.75rem;flex-wrap:wrap}' +
      '.cb-btn{padding:.625rem 1.25rem;border-radius:8px;font-weight:600;font-size:.875rem;font-family:inherit;cursor:pointer;border:none;transition:all .2s;min-height:44px}' +
      '.cb-accept{background:var(--accent,#4a7c59);color:#fff}' +
      '.cb-accept:hover{background:var(--accent-hover,#5a9469)}' +
      '.cb-reject{background:transparent;color:var(--text-primary,#e8e6e1);border:1px solid var(--border-strong,rgba(255,255,255,.15))}' +
      '.cb-reject:hover{border-color:var(--accent,#4a7c59);color:var(--accent,#4a7c59)}' +
      '.cb-settings-toggle{background:none;border:none;color:var(--text-muted,#9a9890);font-size:.8125rem;font-family:inherit;cursor:pointer;padding:.25rem 0;text-decoration:underline;transition:color .2s}' +
      '.cb-settings-toggle:hover{color:var(--accent,#4a7c59)}' +
      '.cb-details{display:none;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border,rgba(255,255,255,.08))}' +
      '.cb-details.cb-open{display:block}' +
      '.cb-cat{display:flex;justify-content:space-between;align-items:center;padding:.625rem 0;font-size:.875rem}' +
      '.cb-cat-name{color:var(--text-primary,#e8e6e1);font-weight:500}' +
      '.cb-cat-info{color:var(--text-muted,#9a9890);font-size:.8rem}' +
      '.cb-switch{position:relative;width:44px;height:24px;flex-shrink:0}' +
      '.cb-switch input{opacity:0;width:0;height:0}' +
      '.cb-slider{position:absolute;inset:0;background:rgba(255,255,255,.1);border-radius:24px;cursor:pointer;transition:.3s}' +
      '.cb-slider::before{content:"";position:absolute;height:18px;width:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:.3s}' +
      '.cb-switch input:checked+.cb-slider{background:var(--accent,#4a7c59)}' +
      '.cb-switch input:checked+.cb-slider::before{transform:translateX(20px)}' +
      '.cb-switch input:disabled+.cb-slider{opacity:.5;cursor:default}' +
      '@media(max-width:600px){.cb-box{padding:1.25rem}.cb-actions{flex-direction:column}.cb-btn{width:100%;text-align:center}}';
    document.head.appendChild(style);

    // HTML
    var overlay = document.createElement('div');
    overlay.className = 'cb-overlay';
    overlay.id = 'cookieBanner';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Cookie-Einstellungen');
    overlay.innerHTML =
      '<div class="cb-box">' +
        '<p class="cb-text">' +
          'Wir verwenden Cookies, um unsere Website zu verbessern. Mit „Alle akzeptieren" stimmen Sie der Nutzung von Analyse-Cookies (Google Analytics) zu. ' +
          'Sie können Ihre Einstellungen jederzeit ändern. <a href="/datenschutz.html">Datenschutzerklärung</a>' +
        '</p>' +
        '<div class="cb-actions">' +
          '<button class="cb-btn cb-accept" id="cbAccept">Alle akzeptieren</button>' +
          '<button class="cb-btn cb-reject" id="cbReject">Nur notwendige</button>' +
        '</div>' +
        '<button class="cb-settings-toggle" id="cbToggleSettings">Einstellungen anzeigen</button>' +
        '<div class="cb-details" id="cbDetails">' +
          '<div class="cb-cat">' +
            '<div><span class="cb-cat-name">Notwendig</span><br><span class="cb-cat-info">Immer aktiv – für Grundfunktionen der Website</span></div>' +
            '<label class="cb-switch"><input type="checkbox" checked disabled><span class="cb-slider"></span></label>' +
          '</div>' +
          '<div class="cb-cat">' +
            '<div><span class="cb-cat-name">Statistik / Analyse</span><br><span class="cb-cat-info">Google Analytics – anonymisierte Nutzungsdaten</span></div>' +
            '<label class="cb-switch"><input type="checkbox" id="cbAnalytics"><span class="cb-slider"></span></label>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);

    // Events
    document.getElementById('cbAccept').addEventListener('click', function () {
      setConsent(true);
      loadGA4();
      closeBanner();
    });

    document.getElementById('cbReject').addEventListener('click', function () {
      setConsent(false);
      removeGA4();
      closeBanner();
    });

    document.getElementById('cbToggleSettings').addEventListener('click', function () {
      var d = document.getElementById('cbDetails');
      var isOpen = d.classList.toggle('cb-open');
      this.textContent = isOpen ? 'Einstellungen ausblenden' : 'Einstellungen anzeigen';
    });

    // Verzögert einblenden (nach Render)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        overlay.classList.add('cb-visible');
      });
    });
  }

  function closeBanner() {
    var banner = document.getElementById('cookieBanner');
    if (banner) {
      banner.classList.remove('cb-visible');
      setTimeout(function () { banner.remove(); }, 400);
    }
  }

  // ── Footer-Link: Cookie-Einstellungen erneut öffnen ──
  function bindFooterLink() {
    document.querySelectorAll('[data-cookie-settings]').forEach(function (el) {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        // Alten Banner entfernen falls noch da
        var old = document.getElementById('cookieBanner');
        if (old) old.remove();
        // Neuen Banner zeigen
        createBanner();
        // Analytics-Toggle auf aktuellen Stand setzen
        var consent = getConsent();
        var toggle = document.getElementById('cbAnalytics');
        if (toggle && consent) {
          toggle.checked = consent.analytics;
        }
      });
    });
  }

  // ── Init ──
  function init() {
    var consent = getConsent();
    if (consent === null) {
      // Erster Besuch oder veralteter Consent
      createBanner();
    } else if (consent.analytics) {
      // Consent gegeben → GA4 laden
      loadGA4();
    }
    // Footer-Link binden
    bindFooterLink();
  }

  // DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
