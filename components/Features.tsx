import React from 'react';
import { Feature } from '../types';
import { Battery, Music, MessageCircle, Bell, Cloud, Timer, Eye, Palette, FolderInput, Cpu } from 'lucide-react';

interface FeaturesProps {
  theme: 'dark' | 'light';
}

const features: Feature[] = [
  {
    title: "音乐控制 Music Control",
    description: "自动检测正在播放的音乐并显示歌词 (Auto-detect music & display lyrics)",
    icon: <Music className="text-green-400" size={24} />
  },
  {
    title: "通知监听 Notifications",
    description: "显示 Windows 通知并获取发送者头像 (Show Windows notifications)",
    icon: <Bell className="text-yellow-400" size={24} />
  },
  {
    title: "硬件监控 Hardware",
    description: "实时显示 CPU/GPU 温度和负载 (Real-time CPU/GPU monitor)",
    icon: <Cpu className="text-blue-400" size={24} />
  },
  {
    title: "AI 对话 AI Chat",
    description: "耿鬼陪你聊天解闷 (Chat with Gengar via Gemini)",
    icon: <MessageCircle className="text-pink-400" size={24} />
  },
  {
    title: "天气显示 Weather",
    description: "显示当前位置天气信息 (Current location weather)",
    icon: <Cloud className="text-cyan-400" size={24} />
  },
  {
    title: "番茄钟 Pomodoro",
    description: "25分钟专注工作计时器 (25 min focus timer)",
    icon: <Timer className="text-red-400" size={24} />
  },
  {
    title: "潜伏模式 Stealth Mode",
    description: "60秒无操作后进入省电模式 (仅显示眼睛) (Power saving mode)",
    icon: <Eye className="text-purple-400" size={24} />
  },
  {
    title: "主题切换 Themes",
    description: "多种颜色主题可选 (Multiple color themes)",
    icon: <Palette className="text-orange-400" size={24} />
  },
  {
    title: "文件拖放 Drag & Drop",
    description: "拖放文件到灵动岛快速操作 (Quick actions via drag & drop)",
    icon: <FolderInput className="text-white" size={24} />
  }
];

const Features: React.FC<FeaturesProps> = ({ theme }) => {
  return (
    <section id="features" className={`py-32 px-6 md:px-20 relative overflow-hidden ${
      theme === 'dark' ? '' : 'bg-gray-50'
    }`}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gengar-dark/20 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 flex flex-col md:flex-row items-center justify-center gap-3">
            <span className={`drop-shadow-lg ${
              theme === 'dark'
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-gengar-light to-gengar-accent'
                : 'text-gengar-base'
            }`}>暗影之力</span> 
            <span className={`hidden md:inline font-thin text-3xl ${
              theme === 'dark' ? 'text-gray-700' : 'text-gray-300'
            }`}>/</span> 
            <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>Features</span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            探索 PokeDynamic 的强大功能，体验耿鬼的暗影之力
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard: React.FC<{ feature: Feature; theme: 'dark' | 'light' }> = ({ feature, theme }) => (
  <div className={`group p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
    theme === 'dark'
      ? 'glass-panel border border-white/10 hover:border-gengar-accent/30'
      : 'bg-white border border-gray-200 hover:border-gengar-accent/50 shadow-lg hover:shadow-xl'
  }`}>
    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110">
      {React.cloneElement(feature.icon as React.ReactElement, { size: 80, className: theme === 'dark' ? 'text-white' : 'text-gray-400' })}
    </div>

    <div className="flex flex-col h-full relative z-10">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-gengar-accent/20 transition-all ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-800 to-black border border-white/10 group-hover:border-gengar-accent/30'
          : 'bg-gradient-to-br from-gray-100 to-white border border-gray-200 group-hover:border-gengar-accent/50'
      }`}>
        {feature.icon}
      </div>
      
      <h3 className={`text-xl font-bold mb-3 tracking-wide group-hover:text-gengar-light transition-colors ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {feature.title}
      </h3>
      
      <p className={`text-sm leading-relaxed border-t pt-4 mt-auto ${
        theme === 'dark' 
          ? 'text-gray-400 border-white/5' 
          : 'text-gray-600 border-gray-100'
      }`}>
        {feature.description}
      </p>
    </div>
  </div>
);

export default Features;
