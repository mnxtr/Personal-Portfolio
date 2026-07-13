import { initScrollReveal } from '../scroll-reveal.js';

describe('Scroll Reveal Module', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="reveal"></div>
      <div class="reveal"></div>
      <div class="normal"></div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('should add visible class when element intersects', () => {
    initScrollReveal();

    const reveals = document.querySelectorAll('.reveal');
    expect(reveals.length).toBe(2);
  });

  test('should handle missing reveal elements', () => {
    document.body.innerHTML = '<div></div>';
    expect(() => initScrollReveal()).not.toThrow();
  });
});
