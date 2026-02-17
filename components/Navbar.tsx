import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Download, Check, Loader2 } from 'lucide-react';
import { useDownload } from '../hooks/useDownload';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { status, progress, download } = useDownload();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: '功能' },
    { href: '#preview', label: '预览' },
    { href: '#requirements', label: '系统要求' },
    { href: '#faq', label: 'FAQ' },
  ];

  const getDownloadButtonContent = () => {
    switch (status) {
      case 'downloading':
        return (
          <>
            <Loader2 size={14} className="animate-spin" />
            <span>{progress}%</span>
          </>
        );
      case 'completed':
        return (
          <>
            <Check size={14} />
            <span>下载完成</span>
          </>
        );
      default:
        return (
          <>
            <Download size={14} />
            <span>下载 v1.0</span>
          </>
        );
    }
  };

  const getDownloadButtonStyle = () => {
    switch (status) {
      case 'downloading':
        return 'bg-gray-400 cursor-wait';
      case 'completed':
        return 'bg-green-500 text-white';
      default:
        return 'bg-white text-black hover:bg-gray-200';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? theme === 'dark'
          ? 'bg-black/80 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-4'
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold tracking-tighter flex items-center gap-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            <span className="text-3xl">👻</span>
            Poke<span className="text-gengar-accent">Dynamic</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className={`transition-colors ${
                theme === 'dark' 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark'
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label="切换主题"
          >
            {theme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button 
            onClick={download}
            disabled={status === 'downloading'}
            className={`hidden md:flex text-xs font-bold px-5 py-2.5 rounded-full transition-colors items-center gap-2 ${getDownloadButtonStyle()}`}
          >
            {getDownloadButtonContent()}
          </button>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-white/10 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
            aria-label="菜单"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className={`md:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-b ${
          theme === 'dark'
            ? 'bg-black/95 border-white/10'
            : 'bg-white/95 border-gray-200'
        }`}>
          <div className="px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-2 transition-colors ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button 
              onClick={download}
              disabled={status === 'downloading'}
              className={`w-full text-sm font-bold px-5 py-3 rounded-full transition-colors flex items-center justify-center gap-2 ${getDownloadButtonStyle()}`}
            >
              {getDownloadButtonContent()}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
