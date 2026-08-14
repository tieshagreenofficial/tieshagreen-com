// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile nav toggle
const navBurger = document.getElementById('navBurger');
if (navBurger) {
  navBurger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('nav-open');
    navBurger.setAttribute('aria-expanded', String(isOpen));
  });
  document.querySelectorAll('#navLinksList a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      navBurger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => io.observe(el));

// Animated stat counter
const statNum = document.querySelector('.stat-num');
if (statNum) {
  const target = parseInt(statNum.dataset.count, 10);
  let started = false;
  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        let cur = 0;
        const step = () => {
          cur += Math.max(1, Math.round(target / 40));
          if (cur >= target) { statNum.textContent = target; return; }
          statNum.textContent = cur;
          requestAnimationFrame(step);
        };
        step();
      }
    });
  }, { threshold: 0.4 });
  statIo.observe(statNum);
}

// Magnetic buttons
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

// Tilt card (hero + about photo) — subtle parallax tilt on mouse move
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Signup form fake-submit confirmation
const signupForm = document.getElementById('signupForm');
const signupConfirm = document.getElementById('signupConfirm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signupConfirm.classList.add('show');
    signupForm.reset();
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Floating gold motes in the full-photo hero (movement over the picture)
const moteField = document.getElementById('heroParticles');
if (moteField) {
  const MOTE_COUNT = 26;
  for (let i = 0; i < MOTE_COUNT; i++) {
    const mote = document.createElement('div');
    mote.className = 'mote';
    const size = 3 + Math.random() * 6;
    mote.style.width = `${size}px`;
    mote.style.height = `${size}px`;
    mote.style.left = `${Math.random() * 100}%`;
    mote.style.setProperty('--drift', `${(Math.random() - 0.5) * 120}px`);
    const duration = 9 + Math.random() * 10;
    mote.style.animationDuration = `${duration}s`;
    mote.style.animationDelay = `${Math.random() * duration}s`;
    moteField.appendChild(mote);
  }
}

// Side scroll-progress rail dot — hardened against layout timing issues
const railDot = document.getElementById('railDot');
if (railDot) {
  let ticking = false;
  const updateRail = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const docHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    ) - window.innerHeight;
    const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    const top = 8 + pct * 84;
    railDot.style.top = `${top}%`;
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateRail);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateRail);
  window.addEventListener('load', updateRail);
  document.addEventListener('DOMContentLoaded', updateRail);
  updateRail();
  setTimeout(updateRail, 400);
}
