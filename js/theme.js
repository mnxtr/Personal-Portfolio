/**
 * Theme management module
 * Handles dark/light theme toggle and persistence
 */

/**
 * Set up theme toggle for a specific button
 * @param {string} toggleId - ID of toggle button
 * @param {string} sunId - ID of sun icon
 * @param {string} moonId - ID of moon icon
 */
export function setupTheme(toggleId, sunId, moonId) {
  const btn = document.getElementById(toggleId);
  const sun = document.getElementById(sunId);
  const moon = document.getElementById(moonId);

  if (!btn) {
    console.warn(`Theme toggle button with ID "${toggleId}" not found`);
    return;
  }

  btn.addEventListener('click', () => {
    try {
      document.body.classList.toggle('light');
      const isLight = document.body.classList.contains('light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');

      if (sun) {
        sun.classList.toggle('hidden', !isLight);
      }
      if (moon) {
        moon.classList.toggle('hidden', isLight);
      }
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  });
}

/**
 * Initialize theme on page load
 */
export function initTheme() {
  try {
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
      document.body.classList.add('light');
      ['sunIcon', 'sunIconMobile'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.remove('hidden');
        }
      });
      ['moonIcon', 'moonIconMobile'].forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          el.classList.add('hidden');
        }
      });
    }

    setupTheme('themeToggle', 'sunIcon', 'moonIcon');
    setupTheme('themeToggleMobile', 'sunIconMobile', 'moonIconMobile');
  } catch (error) {
    console.error('Error initializing theme:', error);
  }
}
