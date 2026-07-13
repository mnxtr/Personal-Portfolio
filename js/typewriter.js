/**
 * Typewriter effect module
 * Handles animated typing effect for hero section
 */

/**
 * Start typewriter animation
 * @param {HTMLElement} element - Target element for typing
 * @param {string[]} phrases - Array of phrases to cycle through
 * @param {number} typeSpeed - Speed of typing in ms
 * @param {number} deleteSpeed - Speed of deletion in ms
 * @param {number} pauseTime - Pause time between phrases in ms
 */
export function initTypewriter(
  element,
  phrases = [
    'Building Intelligent AI Systems.',
    'LLMs · RAG · Neural Networks.',
    'Full Stack Development.',
    'Python · FastAPI · PyTorch · React.',
  ],
  typeSpeed = 50,
  deleteSpeed = 35,
  pauseTime = 2000,
) {
  if (!element) {
    console.warn('Typewriter element not found');
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const typeWriter = () => {
    try {
      const current = phrases[phraseIndex];

      if (!deleting) {
        element.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeWriter, pauseTime);
          return;
        }
      } else {
        element.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
        }
      }

      setTimeout(typeWriter, deleting ? deleteSpeed : typeSpeed);
    } catch (error) {
      console.error('Error in typewriter animation:', error);
    }
  };

  return typeWriter;
}
