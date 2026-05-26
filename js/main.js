/* ============================================
   STANDFEST DIGITAL — Main JS
   Version: 2.0 | Unified
   Nav, FAQ, Form, Scroll Reveal, Login, Floating Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Nav Toggle (overlay + animated burger) ---
  const navToggle = document.getElementById('navToggle');
  const navOverlay = document.getElementById('navOverlay');
  const navbar = document.getElementById('navbar');
  if (navToggle && navOverlay) {
    navToggle.addEventListener('click', () => {
      const isOpen = navOverlay.classList.toggle('open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      if (navbar) navbar.classList.toggle('nav--menu-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Close on link click
    navOverlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navOverlay.classList.remove('open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        if (navbar) navbar.classList.remove('nav--menu-open');
        document.body.style.overflow = '';
      });
    });
  }

  // --- 2. Active Nav Link ---
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a:not(.nav-cta)').forEach(link => {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === currentPath || (currentPath === '/index.html' && href === '/')) {
      link.classList.add('active');
    }
  });

  // --- 3. Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- 4. FAQ Accordion ---
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      if (!wasActive) item.classList.add('active');
    });
  });

  // --- 5. Contact Form ---
  const form = document.getElementById('contact-form') || document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const success = document.querySelector('.form-success');
      const error = document.querySelector('.form-error');

      if (!data.get('name') || !data.get('email') || !data.get('message')) {
        if (error) { error.style.display = 'block'; }
        return;
      }

      // TODO: Replace with actual form endpoint (n8n webhook)
      form.style.display = 'none';
      if (success) success.style.display = 'block';
    });
  }

  // --- 6. Scroll Reveal (IntersectionObserver) ---
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || '0';
        entry.target.style.transitionDelay = delay + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // --- 7. Login Modal ---
  const modalHTML = `
  <div class="modal-overlay" id="loginModal">
    <div class="modal">
      <div class="modal-header">
        <h3>Kundenbereich</h3>
        <button class="modal-close" id="modalClose">&times;</button>
      </div>
      <div class="modal-body">
        <div class="modal-error" id="loginError">E-Mail oder Passwort ist nicht korrekt.</div>
        <div id="loginFormWrap">
          <div class="form-group">
            <label for="loginEmail">E-Mail-Adresse</label>
            <input type="email" id="loginEmail" placeholder="ihre@email.at" required>
          </div>
          <div class="form-group">
            <label for="loginPassword">Passwort</label>
            <input type="password" id="loginPassword" placeholder="Ihr Passwort" required>
          </div>
          <button type="button" class="modal-submit" id="loginSubmit">Anmelden</button>
        </div>
        <div class="modal-footer">
          Noch kein Konto? <a href="/kontakt.html">Kontakt aufnehmen</a>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const loginModal = document.getElementById('loginModal');
  const loginBtn = document.getElementById('loginBtn');
  const modalClose = document.getElementById('modalClose');
  const loginSubmit = document.getElementById('loginSubmit');
  const loginError = document.getElementById('loginError');

  // Check if already logged in
  const session = JSON.parse(localStorage.getItem('standfest_session') || sessionStorage.getItem('standfest_session') || 'null');
  if (session && session.loggedIn && loginBtn) {
    const initials = session.initials || session.name?.charAt(0)?.toUpperCase() || 'K';
    loginBtn.innerHTML = '<span class="nav-avatar">' + initials + '</span>';
    loginBtn.onclick = () => window.location.href = '/kunden.html';
  } else if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      if (loginModal) {
        loginModal.classList.add('active');
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) emailInput.focus();
      }
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => loginModal.classList.remove('active'));
  }
  if (loginModal) {
    loginModal.addEventListener('click', (e) => {
      if (e.target === loginModal) loginModal.classList.remove('active');
    });
  }

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && loginModal) loginModal.classList.remove('active');
  });

  if (loginSubmit) {
    loginSubmit.addEventListener('click', () => {
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      // TODO: Replace with real auth (n8n webhook / API call)
      // Demo: any valid email + password with 6+ chars logs in
      if (email && password.length >= 6) {
        const name = email.split('@')[0];
        const initials = name.substring(0, 2).toUpperCase();
        const sessionData = { loggedIn: true, email: email, name: name, initials: initials };
        sessionStorage.setItem('standfest_session', JSON.stringify(sessionData));
        loginModal.classList.remove('active');
        window.location.href = '/kunden.html';
      } else {
        if (loginError) loginError.classList.add('show');
      }
    });
  }

  // --- 8. Logout ---
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('standfest_session');
      localStorage.removeItem('standfest_session');
      window.location.href = '/';
    });
  }

  // --- 9. Dashboard Tab Navigation ---
  document.querySelectorAll('.dash-nav-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.dash-nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
      item.classList.add('active');
      const tab = document.getElementById(item.dataset.tab);
      if (tab) tab.classList.add('active');
    });
  });

  // --- 10. Dashboard: Redirect if not logged in ---
  if (window.location.pathname.includes('kunden') || window.location.pathname.includes('dashboard')) {
    const s = JSON.parse(sessionStorage.getItem('standfest_session') || 'null');
    if (!s || !s.loggedIn) {
      // Don't redirect, allow viewing demo dashboard
    }
  }

  // --- 11. Dashboard: Fill user data ---
  const dashName = document.getElementById('dashUserName');
  const dashEmail = document.getElementById('dashUserEmail');
  const s = JSON.parse(sessionStorage.getItem('standfest_session') || 'null');
  if (dashName) dashName.textContent = s?.name || 'Kunde';
  if (dashEmail) dashEmail.textContent = s?.email || '';

  // --- 12. Sticky Mobile Contact Bar (Anrufen + WhatsApp) ---
  // Nur Marketing-Seiten, nicht im Kunden-Dashboard. CSS regelt Mobil-Sichtbarkeit.
  const _p = window.location.pathname;
  const _isDashboard = _p.includes('kunden') || _p.includes('dashboard');
  if (!_isDashboard && !document.getElementById('stickyContact')) {
    const stickyHTML = `
    <nav class="sticky-contact" id="stickyContact" aria-label="Schnellkontakt">
      <a class="sticky-contact-btn sticky-contact-call" href="tel:+436644123928">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
        <span>Anrufen</span>
      </a>
      <a class="sticky-contact-btn sticky-contact-wa" href="https://wa.me/436644123928?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20Standfest%20Digital." target="_blank" rel="noopener">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span>WhatsApp</span>
      </a>
    </nav>`;
    document.body.insertAdjacentHTML('beforeend', stickyHTML);
    document.body.classList.add('has-sticky-contact');
  }

});

/* ============================================
   STICKY NAV — scroll shrink effect
   ============================================ */
(function() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let ticking = false;
  let lastY = window.scrollY;
  function update() {
    const y = window.scrollY;
    // Shrink/float state
    nav.classList.toggle('nav--scrolled', y > 10);
    // Hide on scroll down, show on scroll up.
    // Always visible near the top or while the mobile menu is open.
    const overlay = document.getElementById('navOverlay');
    const menuOpen = overlay && overlay.classList.contains('open');
    if (menuOpen || y < 120) {
      nav.classList.remove('nav--hidden');
    } else if (y > lastY + 4) {
      nav.classList.add('nav--hidden');      // scrolling down
    } else if (y < lastY - 4) {
      nav.classList.remove('nav--hidden');   // scrolling up
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
  update(); // check on load
})();
