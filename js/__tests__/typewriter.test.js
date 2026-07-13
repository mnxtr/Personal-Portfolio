import { initTypewriter } from '../typewriter.js';

describe('Typewriter Module', () => {
  let element;

  beforeEach(() => {
    element = document.createElement('div');
    document.body.appendChild(element);
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    document.body.innerHTML = '';
  });

  test('should initialize typewriter with default phrases', () => {
    const typeWriter = initTypewriter(element);
    expect(typeof typeWriter).toBe('function');
  });

  test('should accept custom phrases', () => {
    const customPhrases = ['Custom', 'Phrases'];
    const typeWriter = initTypewriter(element, customPhrases);
    expect(typeof typeWriter).toBe('function');
  });

  test('should return undefined for missing element', () => {
    const typeWriter = initTypewriter(null);
    expect(typeWriter).toBeUndefined();
  });
});
