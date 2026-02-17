import React from 'react';
import { Check, Cpu, MemoryStick, HardDrive, Monitor } from 'lucide-react';

const SystemRequirements: React.FC = () => {
  return (
    <section id="requirements" className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#0a0812] to-[#0f0a1e] relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gengar-light to-gengar-accent">系统要求</span>
            <span className="hidden md:inline text-gray-700 font-thin text-3xl mx-3">/</span>
            <span className="text-white">Requirements</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            确保你的设备满足运行条件
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RequirementCard 
            title="最低配置"
            badge="基础体验"
            items={[
              { icon: <Monitor size={16} />, text: "Windows 10 1903+" },
              { icon: <Cpu size={16} />, text: "Intel Core i3 / AMD Ryzen 3" },
              { icon: <MemoryStick size={16} />, text: "4GB RAM" },
              { icon: <HardDrive size={16} />, text: "100MB 可用空间" },
              { icon: <span className="text-xs font-bold">.NET</span>, text: ".NET 6.0 Runtime" },
            ]}
            isRecommended={false}
          />
          <RequirementCard 
            title="推荐配置"
            badge="最佳体验"
            items={[
              { icon: <Monitor size={16} />, text: "Windows 11 22H2+" },
              { icon: <Cpu size={16} />, text: "Intel Core i5 / AMD Ryzen 5" },
              { icon: <MemoryStick size={16} />, text: "8GB RAM" },
              { icon: <HardDrive size={16} />, text: "200MB 可用空间" },
              { icon: <span className="text-xs font-bold">.NET</span>, text: ".NET 8.0 Runtime" },
            ]}
            isRecommended={true}
          />
        </div>
      </div>
    </section>
  );
};

const RequirementCard: React.FC<{
  title: string;
  badge: string;
  items: { icon: React.ReactNode; text: string }[];
  isRecommended: boolean;
}> = ({ title, badge, items, isRecommended }) => (
  <div className={`glass-panel p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 ${
    isRecommended 
      ? 'border-gengar-accent/30 hover:border-gengar-accent/60' 
      : 'border-white/10 hover:border-gengar-light/30'
  }`}>
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-bold text-white">{title}</h3>
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
        isRecommended 
          ? 'bg-gengar-accent text-white' 
          : 'bg-gengar-base text-gray-200'
      }`}>
        {badge}
      </span>
    </div>
    <ul className="space-y-4">
      {items.map((item, index) => (
        <li key={index} className="flex items-center gap-3 text-gray-300">
          <span className="text-green-400 flex-shrink-0">
            <Check size={16} />
          </span>
          <span className="text-gray-400 w-5 flex-shrink-0">{item.icon}</span>
          <span className="text-sm">{item.text}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default SystemRequirements;
