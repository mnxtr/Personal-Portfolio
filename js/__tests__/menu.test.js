import { initMobileMenu } from '../menu.js';

describe('Mobile Menu Module', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <button id="menuToggle" aria-expanded="false"></button>
      <nav id="mobileMenu"></nav>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should toggle menu on button click', () => {
    initMobileMenu();
    const button = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');

    button.click();
    expect(menu.classList.contains('open')).toBe(true);
    expect(button.getAttribute('aria-expanded')).toBe('true');

    button.click();
    expect(menu.classList.contains('open')).toBe(false);
    expect(button.getAttribute('aria-expanded')).toBe('false');
  });

  test('should close menu on Escape key', () => {
    initMobileMenu();
    const button = document.getElementById('menuToggle');
    const menu = document.getElementById('mobileMenu');

    button.click(); // Open menu
    expect(menu.classList.contains('open')).toBe(true);

    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    expect(menu.classList.contains('open')).toBe(false);
  });

  test('should handle missing elements gracefully', () => {
    document.body.innerHTML = '';
    expect(() => initMobileMenu()).not.toThrow();
  });
});
