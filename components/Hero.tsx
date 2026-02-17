import React from 'react';
import { ArrowDown, Monitor, Download, FileText, Check, Loader2 } from 'lucide-react';
import DownloadStats from './DownloadStats';
import { useDownload } from '../hooks/useDownload';

interface HeroProps {
  theme: 'dark' | 'light';
}

const Hero: React.FC<HeroProps> = ({ theme }) => {
  const { status, progress, download } = useDownload();

  const getDownloadButtonContent = () => {
    switch (status) {
      case 'downloading':
        return (
          <>
            <Loader2 size={18} className="animate-spin text-gengar-base" />
            <span>下载中 {progress}%</span>
            <span className="text-lg">👻</span>
          </>
        );
      case 'completed':
        return (
          <>
            <Check size={18} className="text-green-600" />
            <span>下载完成!</span>
            <span className="text-lg">✨</span>
          </>
        );
      default:
        return (
          <>
            <Download size={18} className="text-gengar-base" />
            <span>立即下载 v1.0</span>
            <span className="text-lg">👻</span>
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
        return 'bg-white text-black hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]';
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-20 pt-20 overflow-visible">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-gengar-dark rounded-full mix-blend-multiply filter blur-[128px] opacity-50 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-900 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-gengar-base rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      <div className="flex-1 text-center md:text-left z-10 max-w-2xl pt-10 md:pt-0">
        <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-xs font-semibold tracking-wide mb-8 shadow-[0_0_15px_rgba(201,109,216,0.15)] hover:bg-white/10 transition-colors cursor-default ${
          theme === 'dark'
            ? 'border-gengar-light/20 bg-white/5 backdrop-blur-md text-gengar-accent'
            : 'border-gengar-base/20 bg-white/80 backdrop-blur-md text-gengar-base'
        }`}>
          <Monitor size={14} className="mr-2" />
          <span>Windows 10 / 11 Compatible</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
          <span className="relative inline-block">
            <span className="absolute -inset-1 blur-2xl bg-gengar-accent/30 rounded-full"></span>
            <span className={`relative text-transparent bg-clip-text bg-gradient-to-r drop-shadow-sm ${
              theme === 'dark'
                ? 'from-white via-gengar-light to-gengar-accent'
                : 'from-gengar-dark via-gengar-base to-gengar-accent'
            }`}>
              PokeDynamic
            </span>
          </span>
          <br />
          <span className={`text-3xl md:text-5xl block mt-2 font-bold ${
            theme === 'dark' ? 'text-white/90' : 'text-gray-900'
          }`}>
            Windows 灵动岛宝可梦皮肤
          </span>
        </h1>

        <p className={`text-xl mb-2 font-medium ${
          theme === 'dark' ? 'text-gengar-light/80' : 'text-gengar-base'
        }`}>
          版本 1.0 <span className="mx-2 opacity-50">|</span> 耿鬼陪你工作学习
        </p>
        
        <p className={`text-base mb-10 max-w-lg mx-auto md:mx-0 leading-relaxed ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Unlock a desktop companion that brings the dynamic island experience to Windows, featuring a mischievous Gengar twist and powerful utilities.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5">
          <button 
            onClick={download}
            disabled={status === 'downloading'}
            className={`group relative px-8 py-4 font-bold rounded-full overflow-hidden transition-all transform flex items-center gap-2 ${getDownloadButtonStyle()}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              {getDownloadButtonContent()}
            </span>
            {status === 'idle' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            )}
          </button>
          
          <a 
            href="#changelog"
            className={`px-8 py-4 rounded-full transition-all flex items-center gap-2 group ${
              theme === 'dark'
                ? 'bg-black/30 text-white border border-white/10 hover:bg-white/10 backdrop-blur-md hover:border-gengar-light/50'
                : 'bg-white/50 text-gray-900 border border-gray-200 hover:bg-white backdrop-blur-md hover:border-gengar-base/50'
            }`}
          >
            <FileText size={18} />
            <span>查看更新日志</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <DownloadStats />
      </div>
      
      <div className="hidden md:flex flex-1 w-full justify-center items-center mt-12 md:mt-0 relative">
          <div className="relative w-80 h-80 animate-float">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-gengar-accent/40 to-transparent blur-3xl"></div>
              
              <img 
                src="assets/gengar_hero_website_1771317567797.jpg" 
                alt="Gengar Dynamic Island"
                className="w-full h-full object-contain drop-shadow-[0_0_30px_rgba(123,94,187,0.8)] z-10 relative hover:scale-110 transition-transform duration-500 cursor-pointer rounded-3xl"
              />
              
              <div className="absolute top-0 right-0 w-3 h-3 bg-gengar-accent rounded-full blur-[2px] animate-ping"></div>
              <div className="absolute bottom-10 left-10 w-2 h-2 bg-purple-400 rounded-full blur-[1px] animate-pulse"></div>
          </div>
      </div>

      <a 
        href="#preview"
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer transition-colors ${
          theme === 'dark' ? 'text-white/20 hover:text-white' : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
};

export default Hero;
