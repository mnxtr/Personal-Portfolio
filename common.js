// Common Tailwind CSS configuration
window.tailwindConfig = {
    theme: {
        extend: {
            colors: {
                primary: '#3B82F6',
                darkBg: '#1E293B',
                darkText: '#CBD5E1',
                accent: '#0EA5E9',
                success: '#10B981',
                warning: '#F59E0B',
                error: '#EF4444'
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in',
                'slide-up': 'slideUp 0.5s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' }
                }
            }
        }
    }
};

// Optimized typewriter animation using requestAnimationFrame
function typeWriter(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    let index = 0;
    let lastTime = 0;
    
    function animate(currentTime) {
        if (!lastTime) lastTime = currentTime;
        const elapsed = currentTime - lastTime;
        
        if (elapsed >= speed && index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            lastTime = currentTime;
        }
        
        if (index < text.length) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// Initialize typewriter on homepage if element exists
document.addEventListener('DOMContentLoaded', function() {
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        typeWriter('typewriter', 'Specializing in secure API development and backend solutions', 50);
    }
});
