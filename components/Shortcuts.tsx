import React from 'react';
import { Keyboard } from 'lucide-react';

interface ShortcutsProps {
  theme: 'dark' | 'light';
}

const shortcutList = [
  { keys: ["Alt", "L"], action: "一键切换潜伏模式" },
  { keys: ["Alt", "E"], action: "切换潜伏模式眼睛颜色" },
  { keys: ["Alt", "Q"], action: "切换显示系统状态页" },
  { keys: ["Alt", "P"], action: "番茄钟专注模式" },
  { keys: ["Alt", "T"], action: "切换主题颜色" },
  { keys: ["Double Click"], action: "展开/收起聊天页面" },
];

const Shortcuts: React.FC<ShortcutsProps> = ({ theme }) => {
  return (
    <section id="shortcuts" className={`py-24 px-6 md:px-20 relative ${
      theme === 'dark' 
        ? 'bg-gradient-to-b from-[#0f0a1e] to-[#160e2b]' 
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex items-center justify-center mb-16 gap-4">
          <div className={`p-3 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gengar-base/20 border-gengar-accent/30'
              : 'bg-gengar-base/10 border-gengar-accent/50'
          }`}>
            <Keyboard className="text-gengar-accent" size={32} />
          </div>
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            全局快捷键 <span className="text-gray-500 font-light">Shortcuts</span>
          </h2>
        </div>

        <div className={`backdrop-blur-xl border rounded-3xl overflow-hidden shadow-2xl ${
          theme === 'dark'
            ? 'bg-[#1a1426]/80 border-white/10'
            : 'bg-white/80 border-gray-200'
        }`}>
           <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">
             <div className={`divide-y ${
               theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'
             }`}>
                {shortcutList.slice(0, 3).map((item, index) => (
                  <ShortcutItem key={index} item={item} theme={theme} />
                ))}
             </div>
             <div className={`divide-y ${
               theme === 'dark' ? 'divide-white/5' : 'divide-gray-100'
             }`}>
                {shortcutList.slice(3, 6).map((item, index) => (
                   <ShortcutItem key={index} item={item} theme={theme} />
                ))}
             </div>
           </div>
        </div>
        
        <div className={`text-center mt-8 text-xs font-mono ${
          theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
        }`}>
            * 快捷键可在设置中自定义
        </div>
      </div>
    </section>
  );
};

const ShortcutItem: React.FC<{ item: { keys: string[], action: string }; theme: 'dark' | 'light' }> = ({ item, theme }) => (
  <div className={`flex flex-col sm:flex-row items-center justify-between p-6 transition-colors group ${
    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
  }`}>
    <div className="flex space-x-2 mb-3 sm:mb-0">
      {item.keys.map((key, i) => (
        <span 
          key={i} 
          className={`relative inline-flex items-center justify-center min-w-[3rem] h-10 px-3 font-mono text-sm font-bold rounded-lg border-b-4 shadow-[0_2px_0_rgba(255,255,255,0.1)_inset] transform group-hover:translate-y-[1px] group-hover:border-b-2 transition-all ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-200 border-gray-950'
              : 'bg-gray-100 text-gray-700 border-gray-300'
          }`}
        >
          {key}
        </span>
      ))}
    </div>
    <span className={`font-medium text-sm sm:text-right transition-colors ${
      theme === 'dark' 
        ? 'text-gray-300 group-hover:text-white' 
        : 'text-gray-600 group-hover:text-gray-900'
    }`}>
      {item.action}
    </span>
  </div>
);

export default Shortcuts;
