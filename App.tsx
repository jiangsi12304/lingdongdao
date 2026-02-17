import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Shortcuts from './components/Shortcuts';
import DynamicIsland from './components/DynamicIsland';
import Footer from './components/Footer';
import PreviewMockup from './components/PreviewMockup';
import SystemRequirements from './components/SystemRequirements';
import Changelog from './components/Changelog';
import FAQ from './components/FAQ';
import Gallery from './components/Gallery';
import ProgressBar from './components/ProgressBar';
import BackToTop from './components/BackToTop';
import { useDownload } from './hooks/useDownload';

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const { status, progress, download } = useDownload();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const getCTAButtonContent = () => {
    switch (status) {
      case 'downloading':
        return (
          <>
            <span className="animate-spin mr-2">⏳</span>
            下载中 {progress}%
          </>
        );
      case 'completed':
        return (
          <>
            下载完成! ✨
          </>
        );
      default:
        return (
          <>
            立即下载 <span className="ml-2">👻</span>
          </>
        );
    }
  };

  const getCTAButtonStyle = () => {
    switch (status) {
      case 'downloading':
        return 'bg-gray-400 cursor-wait';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-white text-gengar-dark hover:scale-105 shadow-2xl';
    }
  };

  return (
    <div className={`min-h-screen selection:bg-gengar-accent selection:text-white transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-[#0f0a1e] text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <ProgressBar />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <div className="lg:flex lg:flex-row-reverse lg:items-center lg:justify-center max-w-[1400px] mx-auto min-h-screen">
          <div className="flex-1 min-h-[500px] lg:h-auto flex items-center justify-center pt-20 lg:pt-0">
            <div className="transform scale-90 lg:scale-100">
              <DynamicIsland />
            </div>
          </div>
          <div className="flex-1">
            <Hero theme={theme} />
          </div>
        </div>

        <PreviewMockup />
        <Gallery />
        <Features theme={theme} />
        <Shortcuts theme={theme} />
        <SystemRequirements />
        <Changelog />
        <FAQ />
        
        <section className={`py-20 px-6 text-center relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-gengar-dark to-purple-900'
            : 'bg-gradient-to-r from-gengar-base/20 to-purple-200'
        }`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className={`absolute text-5xl opacity-20 animate-[ghostFloat_8s_ease-in-out_infinite] ${
              theme === 'dark' ? '' : 'opacity-10'
            }`} style={{ top: '20%', left: '10%' }}>👻</div>
            <div className="absolute text-5xl opacity-20 animate-[ghostFloat_8s_ease-in-out_infinite_2s]" style={{ top: '60%', right: '15%' }}>👻</div>
            <div className="absolute text-5xl opacity-20 animate-[ghostFloat_8s_ease-in-out_infinite_4s]" style={{ bottom: '20%', left: '20%' }}>👻</div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className={`text-4xl font-bold mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              准备好让你的桌面灵动起来了吗？
            </h2>
            <p className={`mb-8 text-lg ${
              theme === 'dark' ? 'text-purple-200' : 'text-gray-600'
            }`}>
              加入数千名用户，体验独一无二的耿鬼主题灵动岛
            </p>
            <button 
              onClick={download}
              disabled={status === 'downloading'}
              className={`font-bold text-lg px-12 py-4 rounded-full transition-transform duration-200 ${getCTAButtonStyle()}`}
            >
              {getCTAButtonContent()}
            </button>
            <p className={`mt-4 text-xs ${
              theme === 'dark' ? 'text-purple-300 opacity-60' : 'text-gray-500'
            }`}>
              Compatible with Windows 10 & 11
            </p>
          </div>
        </section>
      </main>

      <Footer theme={theme} />
      <BackToTop />
    </div>
  );
}

export default App;
