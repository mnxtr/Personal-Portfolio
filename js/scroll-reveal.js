/**
 * Scroll reveal animation module
 * Handles reveal animations for elements on scroll
 */

/**
 * Initialize scroll reveal animations using IntersectionObserver
 */
export function initScrollReveal() {
  try {
    // Check if IntersectionObserver is supported
    if (typeof IntersectionObserver === 'undefined') {
      console.warn('IntersectionObserver not supported');
      // Fallback: show all reveal elements immediately
      document.querySelectorAll('.reveal').forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    reveals.forEach((el) => observer.observe(el));
  } catch (error) {
    console.error('Error initializing scroll reveal:', error);
  }
}
