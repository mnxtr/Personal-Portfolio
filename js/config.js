// Tailwind CSS Configuration Object
// This must be applied in each HTML file after Tailwind CDN loads
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
