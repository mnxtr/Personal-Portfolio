import { initTheme, setupTheme } from '../theme.js';

describe('Theme Module', () => {
  beforeEach(() => {
    document.body.classList.remove('light');
    localStorage.clear();
    jest.clearAllMocks();

    // Create required DOM elements
    document.body.innerHTML = `
      <button id="themeToggle"></button>
      <svg id="sunIcon" class="hidden"></svg>
      <svg id="moonIcon"></svg>
      <button id="themeToggleMobile"></button>
      <svg id="sunIconMobile" class="hidden"></svg>
      <svg id="moonIconMobile"></svg>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should initialize dark theme by default', () => {
    initTheme();
    expect(document.body.classList.contains('light')).toBe(false);
  });

  test('should initialize light theme if saved', () => {
    localStorage.setItem('theme', 'light');
    initTheme();
    expect(document.body.classList.contains('light')).toBe(true);
  });

  test('should toggle theme on button click', () => {
    setupTheme('themeToggle', 'sunIcon', 'moonIcon');
    const button = document.getElementById('themeToggle');

    button.click();
    expect(document.body.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('theme')).toBe('light');

    button.click();
    expect(document.body.classList.contains('light')).toBe(false);
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  test('should handle missing button gracefully', () => {
    document.body.innerHTML = '';
    expect(() => setupTheme('nonexistent', 'sun', 'moon')).not.toThrow();
  });
});
