// Utility functions for the portfolio site
// Optimized to run only when needed

/**
 * Typewriter effect for text animation
 * Only runs if the target element exists on the page
 * Performance: Uses setTimeout for character-by-character animation
 */
function initTypewriter(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return; // Early return if element doesn't exist
    
    let index = 0;
    function typeWriter() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    }
    typeWriter();
}

/**
 * Initialize page-specific functionality
 * Called on DOMContentLoaded for better performance
 */
function initPage() {
    // Typewriter effect only on home page
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        initTypewriter('typewriter', 'Specializing in secure API development and backend solutions', 50);
    }
    
    // Form validation for contact page
    const contactForm = document.querySelector('form[action="#"]');
    if (contactForm) {
        initFormValidation(contactForm);
    }
}

/**
 * Form validation for contact form
 * Provides immediate feedback to users
 */
function initFormValidation(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const message = form.querySelector('#message');
        
        // Basic validation
        let isValid = true;
        
        if (name && name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters');
            isValid = false;
        }
        
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (message && message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        if (isValid) {
            // Form is valid - show success message
            showSuccessMessage(form, 'Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
    
    // Clear errors on input
    form.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('input', function() {
            clearError(this);
        });
    });
}

/**
 * Show success message for form submission
 */
function showSuccessMessage(form, message) {
    // Remove any existing success message
    const existingMsg = form.querySelector('.success-message');
    if (existingMsg) {
        existingMsg.remove();
    }
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-success text-white p-4 rounded-lg mt-4 animate-fade-in';
    successDiv.textContent = message;
    form.appendChild(successDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        successDiv.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => successDiv.remove(), 500);
    }, 5000);
}

/**
 * Show error message for form field
 */
function showError(field, message) {
    clearError(field);
    field.classList.add('border-error');
    const error = document.createElement('div');
    error.className = 'text-error text-sm mt-1';
    error.textContent = message;
    field.parentNode.appendChild(error);
}

/**
 * Clear error message for form field
 */
function clearError(field) {
    field.classList.remove('border-error');
    const error = field.parentNode.querySelector('.text-error');
    if (error) {
        error.remove();
    }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPage);
} else {
    initPage();
}
