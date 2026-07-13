/**
 * Mobile menu management module
 * Handles mobile navigation toggle and accessibility
 */

/**
 * Initialize mobile menu functionality
 */
export function initMobileMenu() {
  try {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!menuToggle || !mobileMenu) {
      console.warn('Mobile menu elements not found');
      return;
    }

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      const isOpen = menuToggle.classList.contains('open');
      menuToggle.setAttribute('aria-expanded', isOpen);

      // Trap focus in mobile menu when open
      if (isOpen) {
        mobileMenu.focus();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        menuToggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  } catch (error) {
    console.error('Error initializing mobile menu:', error);
  }
}
