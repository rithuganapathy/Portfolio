// ===========================================================
// Mobile nav toggle
// ===========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===========================================================
// Scroll-reveal animations
// ===========================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ===========================================================
// Hero ambient glow — subtle cursor parallax
// ===========================================================
const hero = document.getElementById('hero');
const heroGlow = document.getElementById('heroGlow');

if (hero && heroGlow && !prefersReducedMotion && window.matchMedia('(pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroGlow.style.setProperty('--mx', x + '%');
    heroGlow.style.setProperty('--my', y + '%');
  });
}

// ===========================================================
// Copy email to clipboard
// ===========================================================
const emailBtn = document.getElementById('emailBtn');
const emailHint = document.getElementById('emailHint');

if (emailBtn) {
  emailBtn.addEventListener('click', async () => {
    const email = emailBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      emailHint.textContent = 'copied ✓';
    } catch (err) {
      emailHint.textContent = 'select & copy manually';
    }
    setTimeout(() => { emailHint.textContent = 'click to copy'; }, 2200);
  });
}

// ===========================================================
// Active nav link highlighting on scroll
// ===========================================================
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('.nav__links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navAnchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));