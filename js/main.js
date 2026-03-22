/* ============================================
   STANDFEST DIGITAL — Main JS
   Version: 2.0 | Unified
   Nav, FAQ, Form, Scroll Reveal, Login, Floating Nav
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Nav Toggle ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
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

});

/* ============================================
   FLOATING NAV (outside DOMContentLoaded)
   ============================================ */
(function() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  let lastY = window.scrollY, ticking = false;
  function update() {
    const y = window.scrollY;
    nav.classList.toggle('nav--scrolled', y > 20);
    if (y < 60) {
      nav.classList.remove('nav--hidden');
    } else if (y - lastY > 5) {
      nav.classList.add('nav--hidden');
    } else if (lastY - y > 5) {
      nav.classList.remove('nav--hidden');
    }
    lastY = y;
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();
