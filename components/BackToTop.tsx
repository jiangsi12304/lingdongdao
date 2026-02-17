import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gengar-accent text-white flex items-center justify-center shadow-[0_0_20px_rgba(201,109,216,0.5)] transition-all duration-300 z-50 hover:shadow-[0_0_30px_rgba(201,109,216,0.8)] hover:-translate-y-1 ${
        isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      aria-label="返回顶部"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;
