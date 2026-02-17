import React, { useState, useEffect } from 'react';

const ProgressBar: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = (scrollTop / docHeight) * 100;
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 h-1 z-[1001] transition-all duration-100"
      style={{ 
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #4a2c7a, #c96dd8, #ff0055)'
      }}
    />
  );
};

export default ProgressBar;
