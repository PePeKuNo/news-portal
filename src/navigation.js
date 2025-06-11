function setupNavigation() {
  const nav = document.querySelector('.nav');
  const navToggle = document.querySelector('.nav-toggle');
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);

  function toggleMenu() {
    const isOpen = navToggle.classList.contains('nav-toggle--open');
    navToggle.classList.toggle('nav-toggle--open');
    nav.classList.toggle('nav--open');
    document.body.style.overflow = isOpen ? '' : 'hidden';
    overlay.style.display = isOpen ? 'none' : 'block';
  }

  navToggle.addEventListener('click', toggleMenu);
  overlay.addEventListener('click', toggleMenu);

  // Close menu on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('nav--open')) {
        toggleMenu();
      }
    });
  });
}

export function initializeNavigation() {
  document.addEventListener('DOMContentLoaded', setupNavigation);
}