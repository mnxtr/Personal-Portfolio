import { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';

export default function Home() {
  const { t } = useTranslation();
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Typewriter effect
  useEffect(() => {
    const text = t('index.typewriter');
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setTypewriterText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, 50);
    
    return () => clearTimeout(timer);
  }, [currentIndex, t]);
  
  return (
    <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
      {/* Avatar with subtle animation */}
      <div 
        className="w-32 h-32 mb-8 relative overflow-hidden rounded-full ring-4 ring-primary ring-offset-2 ring-offset-transparent hover:scale-105 transition-transform duration-300 animate-slide-up"
      >
        <img 
          src="/img/avatar.jpg" 
          alt="Mohammad Mansib Nawaz" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description container */}
      <div 
        className="bg-darkBg bg-opacity-70 p-6 rounded-2xl shadow-lg max-w-2xl animate-slide-up animate-delay-100"
      >
        <h1 className="text-2xl font-bold mb-4">
          {t('index.hello')} <span className="text-primary">Mohammad Mansib Nawaz</span>
        </h1>
        <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: t('index.description') }} />
        <div className="mt-4 h-8">
          <span id="typewriter" className="text-primary font-semibold">{typewriterText}</span>
        </div>
        {/* Button */}
        <div className="mt-8">
          <a 
            href="/contact" 
            className="bg-primary text-white px-6 py-2 rounded-full shadow-xl hover:bg-accent hover:scale-105 transition-all duration-300"
          >
            {t('index.hire')}
          </a>
        </div>
      </div>
    </main>
  );
}