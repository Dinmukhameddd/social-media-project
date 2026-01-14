// Mobile Menu Toggle
(() => {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');

  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
  };

  const openMenu = () => {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
  };

  toggle.addEventListener('click', () => {
    menu.hidden ? openMenu() : closeMenu();
  });

  // Close when clicking a link
  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (menu.hidden) return;
    if (e.target === toggle || toggle.contains(e.target)) return;
    if (e.target === menu || menu.contains(e.target)) return;
    closeMenu();
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

// Scroll Reveal Animation
(() => {
  const revealItems = document.querySelectorAll('.reveal');
  const scrollItems = document.querySelectorAll('.scroll-animate');
  const allItems = [...revealItems, ...scrollItems];
  
  if (!allItems.length) return;

  const showReveal = (el) => el.classList.add('is-visible');
  const showScroll = (el) => el.classList.add('visible');

  // If no IntersectionObserver support, show all immediately
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach(showReveal);
    scrollItems.forEach(showScroll);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.classList.contains('reveal')) {
          showReveal(el);
        }
        if (el.classList.contains('scroll-animate')) {
          showScroll(el);
        }
        obs.unobserve(el);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: '0px 0px -10% 0px' 
  });

  allItems.forEach(el => observer.observe(el));
})();
