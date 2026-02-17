import React, { useState, useEffect } from 'react';
import { Music, Cpu, Bell, Eye, Play, SkipBack, SkipForward } from 'lucide-react';

type TabType = 'music' | 'system' | 'notification' | 'idle';

const PreviewMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('music');
  const [cpuValue, setCpuValue] = useState(45);
  const [gpuValue, setGpuValue] = useState(32);
  const [ramValue, setRamValue] = useState(68);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuValue(Math.floor(Math.random() * 60) + 20);
      setGpuValue(Math.floor(Math.random() * 50) + 15);
      setRamValue(Math.floor(Math.random() * 40) + 50);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'music', label: '音乐模式', icon: <Music size={14} /> },
    { id: 'system', label: '系统监控', icon: <Cpu size={14} /> },
    { id: 'notification', label: '通知', icon: <Bell size={14} /> },
    { id: 'idle', label: '潜伏模式', icon: <Eye size={14} /> },
  ];

  return (
    <section id="preview" className="py-24 px-6 md:px-20 relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gengar-light to-gengar-accent">界面预览</span>
            <span className="hidden md:inline text-gray-700 font-thin text-3xl mx-3">/</span>
            <span className="text-white">Preview</span>
          </h2>
          <p className="text-gray-400">感受耿鬼主题的视觉魅力</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gengar-accent text-white shadow-[0_0_20px_rgba(201,109,216,0.5)]'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:border-gengar-accent/50 hover:text-white'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gengar-accent/20 to-purple-900/20 blur-3xl"></div>
          
          <div className="relative bg-black rounded-[40px] p-6 shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_20px_rgba(201,109,216,0.3)] border border-white/10">
            <div className="min-h-[100px] flex items-center justify-center">
              {activeTab === 'music' && <MusicContent />}
              {activeTab === 'system' && <SystemContent cpu={cpuValue} gpu={gpuValue} ram={ramValue} />}
              {activeTab === 'notification' && <NotificationContent />}
              {activeTab === 'idle' && <IdleContent />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MusicContent: React.FC = () => (
  <div className="flex items-center justify-between w-full px-4">
    <div className="flex items-center gap-4">
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gengar-base to-gengar-accent flex items-center justify-center shadow-lg">
        <Music className="text-white" size={24} />
      </div>
      <div className="text-left">
        <p className="text-white font-bold text-sm">Lavender Town Theme</p>
        <p className="text-gray-400 text-xs">Pokemon OST</p>
      </div>
    </div>
    
    <div className="flex items-center gap-3">
      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
        <SkipBack size={14} className="text-white" />
      </button>
      <button className="w-10 h-10 rounded-full bg-gengar-accent flex items-center justify-center hover:bg-gengar-light transition-colors shadow-lg">
        <Play size={16} className="text-white ml-0.5" />
      </button>
      <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
        <SkipForward size={14} className="text-white" />
      </button>
    </div>

    <div className="flex items-end gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-1 bg-gradient-to-t from-gengar-base to-gengar-accent rounded-full animate-pulse"
          style={{
            height: `${Math.random() * 20 + 10}px`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  </div>
);

const SystemContent: React.FC<{ cpu: number; gpu: number; ram: number }> = ({ cpu, gpu, ram }) => (
  <div className="w-full space-y-3 px-4">
    <StatBar label="CPU" value={cpu} color="from-blue-500 to-cyan-400" />
    <StatBar label="GPU" value={gpu} color="from-green-500 to-emerald-400" />
    <StatBar label="RAM" value={ram} color="from-purple-500 to-pink-400" />
  </div>
);

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="flex items-center gap-4">
    <span className="text-white text-xs font-bold w-10">{label}</span>
    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500`}
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-white text-xs font-mono w-10 text-right">{value}%</span>
  </div>
);

const NotificationContent: React.FC = () => (
  <div className="flex items-center gap-4 px-4">
    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gengar-base to-gengar-accent flex items-center justify-center text-2xl shadow-lg">
      👻
    </div>
    <div className="text-left">
      <p className="text-white font-bold text-sm">小明</p>
      <p className="text-gray-400 text-xs">今晚一起打游戏吗？👻</p>
    </div>
    <div className="ml-auto">
      <span className="text-xs text-gray-500">刚刚</span>
    </div>
  </div>
);

const IdleContent: React.FC = () => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-gradient-radial from-red-500 to-red-900 shadow-[0_0_30px_rgba(255,0,0,0.5)] animate-pulse flex items-center justify-center">
        <div className="w-4 h-2 bg-black/50 rounded-full" />
      </div>
      <div className="absolute inset-0 rounded-full border-2 border-red-500/30 animate-ping" />
    </div>
  </div>
);

export default PreviewMockup;
