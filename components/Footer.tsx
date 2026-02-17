import React from 'react';
import { Github, Twitter, MessageCircle, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  theme: 'dark' | 'light';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const productLinks = [
    { label: '下载', href: '#', isDownload: true },
    { label: '更新日志', href: '#changelog' },
    { label: '主题画廊', href: '#preview' },
    { label: '使用教程', href: '#features' },
  ];

  const supportLinks = [
    { label: '常见问题', href: '#faq' },
    { label: '系统要求', href: '#requirements' },
    { label: '快捷键', href: '#shortcuts' },
    { label: '反馈建议', href: 'https://github.com/pokedynamic/issues', external: true },
  ];

  const legalLinks = [
    { label: '隐私政策', href: '#' },
    { label: '使用条款', href: '#' },
    { label: '开源许可', href: '#' },
  ];

  return (
    <footer className={`py-16 border-t ${
      theme === 'dark' 
        ? 'bg-[#050508] border-white/5' 
        : 'bg-gray-100 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className={`text-2xl font-bold mb-4 flex items-center gap-2 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="text-3xl">👻</span>
              PokeDynamic
            </h3>
            <p className={`max-w-md mb-6 leading-relaxed ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              让你的桌面灵动起来。基于 Windows 的动态岛体验，搭配耿鬼主题。系统监控、媒体控制、消息通知，一切尽在掌握。
            </p>
            <div className={`flex items-center gap-2 text-sm ${
              theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
            }`}>
              <span>Made with</span>
              <Heart size={14} className="text-red-500 fill-red-500 animate-pulse" />
              <span>by PokeDynamic Team</span>
            </div>
          </div>
          
          <div>
            <h4 className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>产品</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className={`transition-colors flex items-center gap-1 ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-gengar-accent' 
                        : 'text-gray-600 hover:text-gengar-base'
                    }`}
                  >
                    {link.label}
                    {link.external && <ExternalLink size={12} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={`font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>支持</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className={`transition-colors flex items-center gap-1 ${
                      theme === 'dark' 
                        ? 'text-gray-400 hover:text-gengar-accent' 
                        : 'text-gray-600 hover:text-gengar-base'
                    }`}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                    {link.external && <ExternalLink size={12} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${
          theme === 'dark' ? 'border-white/5' : 'border-gray-200'
        }`}>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            <p>© 2026 PokeDynamic Team. Designed with Gengar Power.</p>
            <p className="text-xs mt-1 opacity-60">
              Pokemon 和 Gengar 是 Nintendo/Game Freak 的商标。本项目为粉丝创作，与官方无关。
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/pokedynamic" 
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
              }`}
              title="GitHub"
            >
              <Github size={18} />
            </a>
            <a 
              href="#" 
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
              }`}
              title="Twitter"
            >
              <Twitter size={18} />
            </a>
            <a 
              href="#" 
              className={`p-2 rounded-full transition-all transform hover:scale-110 ${
                theme === 'dark'
                  ? 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                  : 'bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-900'
              }`}
              title="Discord"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
