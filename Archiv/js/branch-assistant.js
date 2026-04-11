/* ============================================
   STANDFEST DIGITAL — Branchen-Assistent
   Floating button + selection panel
   Personalizes page content by industry
   ============================================ */
(function () {
  'use strict';

  // ─── BRANCH DATA ──────────────────────────────────
  const BRANCHES = {
    handwerk: {
      emoji: '\u{1F528}',
      label: 'Handwerk',
      hero: 'Professionelle Website f\u00fcr Ihren Handwerksbetrieb.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Mehr Anfragen, weniger Leerfahrten \u2013 mit einer Website, die zeigt, was Sie k\u00f6nnen. Dazu Social-Media-Basics und klare Kontaktwege.',
      problemHeading: 'Was Ihre Kunden heute sehen \u2013 und was Handwerksbetriebe wirklich brauchen',
      ctaLabel: 'L\u00f6sung f\u00fcr Handwerk ansehen',
      ctaLink: '/leistungen.html'
    },
    arzt: {
      emoji: '\u{1FA7A}',
      label: 'Arztpraxis',
      hero: 'Professioneller Online-Auftritt f\u00fcr Ihre Praxis.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Online-Terminbuchung, klare Praxis-Infos und ein Auftritt, der Vertrauen schafft \u2013 professionell eingerichtet.',
      problemHeading: 'Was Patienten heute sehen \u2013 und was Ihre Praxis wirklich brauchen w\u00fcrde',
      ctaLabel: 'Praxis-Auftritt ansehen',
      ctaLink: '/leistungen.html'
    },
    beauty: {
      emoji: '\u{1F487}',
      label: 'Friseur / Beauty',
      hero: 'Professionelle Website f\u00fcr Ihren Salon.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Termine online, Instagram verbunden, Portfolio sichtbar \u2013 Ihr Salon-Auftritt, der Kunden begeistert.',
      problemHeading: 'Was Ihre Kunden online suchen \u2013 und was Beauty-Betriebe wirklich zeigen sollten',
      ctaLabel: 'Beauty-L\u00f6sung ansehen',
      ctaLink: '/leistungen.html'
    },
    gastro: {
      emoji: '\u{1F37D}\uFE0F',
      label: 'Gastro',
      hero: 'Professionelle Website f\u00fcr Ihre Gastronomie.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Speisekarte, Tischreservierung, Google Maps \u2013 alles an einem Ort. Damit G\u00e4ste Sie finden und direkt buchen.',
      problemHeading: 'Was Ihre G\u00e4ste online erwarten \u2013 und was Gastrobetriebe oft \u00fcbersehen',
      ctaLabel: 'Gastro-L\u00f6sung ansehen',
      ctaLink: '/leistungen.html'
    },
    dienstleistung: {
      emoji: '\u{1F4BC}',
      label: 'Dienstleistung',
      hero: 'Professionelle Website f\u00fcr Ihr Unternehmen.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Klare Positionierung, einfache Kontaktaufnahme und ein Auftritt, der \u00fcberzeugt \u2013 ab sofort online sichtbar.',
      problemHeading: 'Was potenzielle Kunden erwarten \u2013 und was Dienstleister oft verpassen',
      ctaLabel: 'L\u00f6sung f\u00fcr Dienstleister ansehen',
      ctaLink: '/leistungen.html'
    },
    sonstige: {
      emoji: '\u2728',
      label: 'Sonstige',
      hero: 'Professionelle Website f\u00fcr Ihr Unternehmen.',
      heroAccent: 'In 10\u201314 Tagen online.',
      subline: 'Egal welche Branche \u2013 wir bringen Sie professionell online. Website, Social Media und klare Kontaktwege aus einer Hand.',
      problemHeading: 'Was Ihre Kunden heute sehen \u2013 und was sie sehen sollten',
      ctaLabel: 'Passende L\u00f6sung finden',
      ctaLink: '/leistungen.html'
    }
  };

  // ─── CSS INJECTION ────────────────────────────────
  const CSS = `
/* ── Branchen-Assistent Floating Button + Panel ── */
.ba-fab {
  position: fixed; bottom: 24px; right: 24px; z-index: 9990;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 20px 12px 16px;
  background: var(--accent, #4a7c59); color: #fff;
  border: none; border-radius: 14px; cursor: pointer;
  font-family: var(--font, 'DM Sans', sans-serif); font-size: 14px; font-weight: 600;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 0 0 0 rgba(74,124,89,0.4);
  transition: all 0.25s ease;
  -webkit-tap-highlight-color: transparent;
}
.ba-fab:hover { transform: translateY(-2px); box-shadow: 0 6px 32px rgba(0,0,0,0.3); }
.ba-fab:active { transform: translateY(0); }
.ba-fab svg { width: 20px; height: 20px; stroke: currentColor; fill: none; stroke-width: 1.5; flex-shrink: 0; }
.ba-fab--selected { background: var(--bg-card, #2a2e25); border: 1px solid var(--border, rgba(255,255,255,0.08)); }
.ba-fab--selected .ba-fab-emoji { font-size: 16px; }
.ba-fab--close svg { transition: transform 0.2s; }

/* Subtle pulse on first load (once) */
@keyframes ba-pulse {
  0%,100% { box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 0 0 0 rgba(74,124,89,0.4); }
  50% { box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 0 0 8px rgba(74,124,89,0); }
}
.ba-fab--pulse { animation: ba-pulse 2s ease-in-out 3; }

/* ── PANEL ── */
.ba-panel {
  position: fixed; bottom: 88px; right: 24px; z-index: 9991;
  width: 340px; max-height: calc(100vh - 120px);
  background: var(--bg-card, #2a2e25);
  border: 1px solid var(--border, rgba(255,255,255,0.08));
  border-radius: 20px;
  box-shadow: 0 16px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04);
  overflow: hidden;
  opacity: 0; visibility: hidden;
  transform: translateY(12px) scale(0.96);
  transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
  pointer-events: none;
}
.ba-panel.open {
  opacity: 1; visibility: visible;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}
.ba-panel-header {
  padding: 24px 24px 0;
}
.ba-panel-title {
  font-size: 17px; font-weight: 700; line-height: 1.35;
  color: var(--text-primary, #e8e6e1); margin-bottom: 4px;
}
.ba-panel-sub {
  font-size: 13px; color: var(--text-muted, #9a9890); line-height: 1.5;
}
.ba-branch-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 10px; padding: 20px 24px 24px;
}
.ba-branch-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; padding: 18px 8px;
  background: rgba(255,255,255,0.03);
  border: 1.5px solid var(--border, rgba(255,255,255,0.08));
  border-radius: 14px; cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
  font-family: var(--font, 'DM Sans', sans-serif);
  color: var(--text-primary, #e8e6e1);
}
.ba-branch-btn:hover {
  border-color: rgba(74,124,89,0.4);
  background: rgba(74,124,89,0.06);
  transform: translateY(-2px);
}
.ba-branch-btn:active { transform: translateY(0); }
.ba-branch-btn.selected {
  border-color: var(--accent, #4a7c59);
  background: rgba(74,124,89,0.1);
  box-shadow: 0 0 0 1px var(--accent, #4a7c59);
}
.ba-branch-emoji { font-size: 28px; line-height: 1; }
.ba-branch-label { font-size: 12.5px; font-weight: 600; }

/* ── RESULT VIEW ── */
.ba-result {
  padding: 24px; display: none;
}
.ba-result.active { display: block; }
.ba-result-icon {
  width: 52px; height: 52px; border-radius: 14px;
  background: var(--accent-subtle, rgba(74,124,89,0.15));
  display: flex; align-items: center; justify-content: center;
  font-size: 26px; margin-bottom: 16px;
}
.ba-result-title {
  font-size: 16px; font-weight: 700;
  color: var(--text-primary, #e8e6e1); margin-bottom: 6px;
}
.ba-result-text {
  font-size: 13.5px; color: var(--text-muted, #9a9890);
  line-height: 1.6; margin-bottom: 20px;
}
.ba-result-cta {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 11px 20px;
  background: var(--accent, #4a7c59); color: #fff;
  border: none; border-radius: 10px;
  font-family: var(--font, 'DM Sans', sans-serif);
  font-size: 14px; font-weight: 600;
  cursor: pointer; text-decoration: none;
  transition: all 0.2s;
}
.ba-result-cta:hover { background: var(--accent-hover, #5a9469); transform: translateY(-1px); }
.ba-result-cta svg { width: 16px; height: 16px; stroke: currentColor; fill: none; stroke-width: 2; }
.ba-result-change {
  display: block; margin-top: 12px;
  font-size: 12.5px; color: var(--text-muted, #9a9890);
  background: none; border: none; cursor: pointer;
  font-family: var(--font, 'DM Sans', sans-serif);
  text-decoration: underline; text-underline-offset: 2px;
  transition: color 0.2s;
}
.ba-result-change:hover { color: var(--text-primary, #e8e6e1); }

/* ── BACKDROP (mobile) ── */
.ba-backdrop {
  position: fixed; inset: 0; z-index: 9989;
  background: rgba(0,0,0,0.4); opacity: 0; visibility: hidden;
  transition: opacity 0.25s, visibility 0.25s;
}
.ba-backdrop.open { opacity: 1; visibility: visible; }

/* ── MOBILE ── */
@media (max-width: 600px) {
  .ba-fab { bottom: 16px; right: 16px; padding: 10px 16px 10px 12px; font-size: 13px; border-radius: 12px; }
  .ba-panel {
    bottom: 0; right: 0; left: 0;
    width: 100%; max-height: 80vh;
    border-radius: 20px 20px 0 0;
    transform: translateY(100%);
  }
  .ba-panel.open { transform: translateY(0); }
}

/* ── PRINT ── */
@media print { .ba-fab, .ba-panel, .ba-backdrop { display: none !important; } }

/* ── FOCUS STYLES ── */
.ba-fab:focus-visible, .ba-branch-btn:focus-visible, .ba-result-cta:focus-visible, .ba-result-change:focus-visible {
  outline: 2px solid var(--accent, #4a7c59); outline-offset: 2px;
}

/* ── PERSONALIZATION TRANSITION ── */
[data-ba-personalized] { transition: opacity 0.35s ease; }
[data-ba-personalized].ba-swapping { opacity: 0; }
`;

  // ─── HTML TEMPLATES ───────────────────────────────
  function buildHTML() {
    let branchButtons = '';
    for (const [key, b] of Object.entries(BRANCHES)) {
      branchButtons += `<button class="ba-branch-btn" data-branch="${key}" aria-label="${b.label}">
        <span class="ba-branch-emoji">${b.emoji}</span>
        <span class="ba-branch-label">${b.label}</span>
      </button>`;
    }

    return `
<div class="ba-backdrop" id="baBackdrop"></div>

<div class="ba-panel" id="baPanel" role="dialog" aria-label="Branchen-Assistent" aria-hidden="true">
  <div class="ba-panel-header" id="baPanelHeader">
    <div class="ba-panel-title">Damit wir euch direkt das zeigen k\u00f6nnen, was zu euch passt \u{1F44B}</div>
    <div class="ba-panel-sub">W\u00e4hlt eure Branche \u2013 wir passen die Inhalte an.</div>
  </div>
  <div class="ba-branch-grid" id="baBranchGrid">${branchButtons}</div>
  <div class="ba-result" id="baResult">
    <div class="ba-result-icon" id="baResultIcon"></div>
    <div class="ba-result-title" id="baResultTitle"></div>
    <div class="ba-result-text" id="baResultText"></div>
    <a class="ba-result-cta" id="baResultCta" href="/leistungen.html">
      <span id="baResultCtaLabel">L\u00f6sung ansehen</span>
      <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </a>
    <button class="ba-result-change" id="baResultChange">Andere Branche w\u00e4hlen</button>
  </div>
</div>

<button class="ba-fab ba-fab--pulse" id="baFab" aria-label="Branchen-Assistent \u00f6ffnen" aria-expanded="false" aria-controls="baPanel">
  <svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
  <span>Passende L\u00f6sung finden</span>
</button>`;
  }

  // ─── STATE ────────────────────────────────────────
  let isOpen = false;
  let selectedBranch = null;

  // ─── SESSION PERSISTENCE ──────────────────────────
  const STORAGE_KEY = 'standfest_branche';

  function saveBranch(key) {
    try { sessionStorage.setItem(STORAGE_KEY, key); } catch (e) { /* silent */ }
  }
  function loadBranch() {
    try { return sessionStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  // ─── DOM REFS ─────────────────────────────────────
  let fab, panel, backdrop, branchGrid, resultView, panelHeader;

  // ─── TOGGLE PANEL ─────────────────────────────────
  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    backdrop.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.setAttribute('aria-expanded', 'true');
    // Show correct view
    if (selectedBranch) {
      showResult(selectedBranch);
    } else {
      showGrid();
    }
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    fab.setAttribute('aria-expanded', 'false');
  }

  function togglePanel() {
    if (isOpen) closePanel(); else openPanel();
  }

  // ─── VIEWS ────────────────────────────────────────
  function showGrid() {
    panelHeader.style.display = '';
    branchGrid.style.display = '';
    document.getElementById('baResult').classList.remove('active');
  }

  function showResult(key) {
    const b = BRANCHES[key];
    if (!b) return;
    panelHeader.style.display = 'none';
    branchGrid.style.display = 'none';
    const result = document.getElementById('baResult');
    result.classList.add('active');
    document.getElementById('baResultIcon').textContent = b.emoji;
    document.getElementById('baResultTitle').textContent = 'Passt! Wir kennen ' + b.label + ' gut.';
    document.getElementById('baResultText').textContent = b.subline;
    document.getElementById('baResultCtaLabel').textContent = b.ctaLabel;
    document.getElementById('baResultCta').href = b.ctaLink;
  }

  // ─── FAB LABEL ────────────────────────────────────
  function updateFab(key) {
    if (key && BRANCHES[key]) {
      const b = BRANCHES[key];
      fab.innerHTML = `<span class="ba-fab-emoji">${b.emoji}</span><span>${b.label}</span>`;
      fab.classList.add('ba-fab--selected');
      fab.classList.remove('ba-fab--pulse');
    }
  }

  // ─── PAGE PERSONALIZATION ─────────────────────────
  function personalizeIndex(key) {
    const b = BRANCHES[key];
    if (!b) return;
    const isIndex = window.location.pathname === '/' ||
                    window.location.pathname === '/index.html' ||
                    window.location.pathname.endsWith('/index.html');
    if (!isIndex) return;

    // Hero Headline
    const heroH1 = document.getElementById('hero-heading');
    if (heroH1) {
      const accentSpan = heroH1.querySelector('.hero-headline-accent');
      // Get the text node before the accent span
      heroH1.childNodes.forEach(function (node) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          swapText(node, b.hero);
        }
      });
      // Also check for br + text pattern
      const firstLine = heroH1.firstChild;
      if (firstLine && firstLine.nodeType === Node.TEXT_NODE) {
        swapText(firstLine, b.hero);
      } else {
        // The hero text might be before a <br>
        for (let i = 0; i < heroH1.childNodes.length; i++) {
          const n = heroH1.childNodes[i];
          if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 5) {
            swapText(n, b.hero);
            break;
          }
        }
      }
      if (accentSpan) {
        swapTextEl(accentSpan, b.heroAccent);
      }
    }

    // Subline
    const subline = document.querySelector('.hero-subline');
    if (subline) {
      swapTextEl(subline, b.subline);
    }

    // Problem heading
    const problemH2 = document.getElementById('problem-heading');
    if (problemH2) {
      swapTextEl(problemH2, b.problemHeading);
    }
  }

  function swapTextEl(el, newText) {
    el.setAttribute('data-ba-personalized', '');
    el.classList.add('ba-swapping');
    setTimeout(function () {
      el.textContent = newText;
      el.classList.remove('ba-swapping');
    }, 300);
  }

  function swapText(textNode, newText) {
    var parent = textNode.parentElement;
    if (parent) {
      parent.setAttribute('data-ba-personalized', '');
      parent.classList.add('ba-swapping');
      setTimeout(function () {
        textNode.textContent = newText + '\n';
        parent.classList.remove('ba-swapping');
      }, 300);
    }
  }

  // ─── SELECT BRANCH ────────────────────────────────
  function selectBranch(key) {
    selectedBranch = key;
    saveBranch(key);

    // Update button highlights
    branchGrid.querySelectorAll('.ba-branch-btn').forEach(function (btn) {
      btn.classList.toggle('selected', btn.dataset.branch === key);
    });

    // Update FAB
    updateFab(key);

    // Show result view
    showResult(key);

    // Personalize page
    personalizeIndex(key);

    // Auto-close after short delay (let user see result first)
    setTimeout(closePanel, 1800);
  }

  // ─── INIT ─────────────────────────────────────────
  function init() {
    // Inject CSS
    var style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    // Inject HTML
    var wrapper = document.createElement('div');
    wrapper.id = 'branchAssistant';
    wrapper.innerHTML = buildHTML();
    document.body.appendChild(wrapper);

    // Get refs
    fab = document.getElementById('baFab');
    panel = document.getElementById('baPanel');
    backdrop = document.getElementById('baBackdrop');
    branchGrid = document.getElementById('baBranchGrid');
    resultView = document.getElementById('baResult');
    panelHeader = document.getElementById('baPanelHeader');

    // Events: FAB
    fab.addEventListener('click', togglePanel);

    // Events: Backdrop
    backdrop.addEventListener('click', closePanel);

    // Events: Branch buttons
    branchGrid.addEventListener('click', function (e) {
      var btn = e.target.closest('.ba-branch-btn');
      if (!btn) return;
      selectBranch(btn.dataset.branch);
    });

    // Events: Change branch
    document.getElementById('baResultChange').addEventListener('click', function () {
      selectedBranch = null;
      try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) { /* silent */ }
      fab.innerHTML = '<svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg><span>Passende L\u00f6sung finden</span>';
      fab.classList.remove('ba-fab--selected');
      showGrid();
    });

    // Events: ESC to close
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closePanel();
    });

    // Restore session
    var saved = loadBranch();
    if (saved && BRANCHES[saved]) {
      selectedBranch = saved;
      updateFab(saved);
      // Personalize immediately (no animation on page load)
      personalizeIndexInstant(saved);
    }

    // Remove pulse after animation ends
    fab.addEventListener('animationend', function () {
      fab.classList.remove('ba-fab--pulse');
    });
  }

  // Instant personalization (no fade, for page load with saved branch)
  function personalizeIndexInstant(key) {
    var b = BRANCHES[key];
    if (!b) return;
    var isIndex = window.location.pathname === '/' ||
                  window.location.pathname === '/index.html' ||
                  window.location.pathname.endsWith('/index.html');
    if (!isIndex) return;

    var heroH1 = document.getElementById('hero-heading');
    if (heroH1) {
      for (var i = 0; i < heroH1.childNodes.length; i++) {
        var n = heroH1.childNodes[i];
        if (n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 5) {
          n.textContent = b.hero + '\n';
          break;
        }
      }
      var accentSpan = heroH1.querySelector('.hero-headline-accent');
      if (accentSpan) accentSpan.textContent = b.heroAccent;
    }

    var subline = document.querySelector('.hero-subline');
    if (subline) subline.textContent = b.subline;

    var problemH2 = document.getElementById('problem-heading');
    if (problemH2) problemH2.textContent = b.problemHeading;
  }

  // ─── BOOT ─────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
