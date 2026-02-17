import React from 'react';
import { Sparkles, Wrench, Zap } from 'lucide-react';

interface ChangelogEntry {
  version: string;
  title: string;
  date: string;
  changes: { type: 'new' | 'fix' | 'improve'; text: string }[];
  isLatest?: boolean;
}

const changelogData: ChangelogEntry[] = [
  {
    version: "v1.0.0",
    title: "首发版本",
    date: "2026-01-15",
    isLatest: true,
    changes: [
      { type: 'new', text: "耿鬼主题灵动岛核心功能" },
      { type: 'new', text: "系统监控（CPU/GPU/RAM）" },
      { type: 'new', text: "媒体播放控制与歌词同步" },
      { type: 'new', text: "通知镜像功能" },
      { type: 'new', text: "潜伏模式动画" },
      { type: 'new', text: "AI 助手集成（豆包）" },
    ]
  },
  {
    version: "v0.9.0",
    title: "Beta 版本",
    date: "2025-12-01",
    changes: [
      { type: 'fix', text: "内存泄漏问题" },
      { type: 'improve', text: "动画流畅度提升 30%" },
      { type: 'improve', text: "降低 CPU 占用" },
    ]
  },
  {
    version: "v0.5.0",
    title: "Alpha 版本",
    date: "2025-10-15",
    changes: [
      { type: 'new', text: "基础灵动岛框架" },
      { type: 'new', text: "基本的系统监控功能" },
    ]
  }
];

const Changelog: React.FC = () => {
  return (
    <section id="changelog" className="py-24 px-6 md:px-20 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gengar-light to-gengar-accent">更新日志</span>
            <span className="hidden md:inline text-gray-700 font-thin text-3xl mx-3">/</span>
            <span className="text-white">Changelog</span>
          </h2>
          <p className="text-gray-400">了解最新版本的变化</p>
        </div>

        <div className="relative">
          <div className="absolute left-[60px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gengar-accent to-transparent"></div>
          
          <div className="space-y-8">
            {changelogData.map((entry, index) => (
              <ChangelogItem key={index} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ChangelogItem: React.FC<{ entry: ChangelogEntry }> = ({ entry }) => {
  const getTagStyle = (type: 'new' | 'fix' | 'improve') => {
    switch (type) {
      case 'new': return 'bg-green-500 text-white';
      case 'fix': return 'bg-orange-500 text-white';
      case 'improve': return 'bg-blue-500 text-white';
    }
  };

  const getTagText = (type: 'new' | 'fix' | 'improve') => {
    switch (type) {
      case 'new': return '新增';
      case 'fix': return '修复';
      case 'improve': return '优化';
    }
  };

  const getTagIcon = (type: 'new' | 'fix' | 'improve') => {
    switch (type) {
      case 'new': return <Sparkles size={10} />;
      case 'fix': return <Wrench size={10} />;
      case 'improve': return <Zap size={10} />;
    }
  };

  return (
    <div className="flex gap-6 items-start">
      <div className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-bold z-10 ${
        entry.isLatest 
          ? 'bg-gengar-accent text-white shadow-[0_0_20px_rgba(201,109,216,0.5)]' 
          : 'bg-gengar-base text-gray-200'
      }`}>
        {entry.version}
      </div>
      
      <div className="flex-1 glass-panel p-6 rounded-2xl border border-white/10 hover:border-gengar-accent/30 transition-all">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{entry.title}</h3>
          <span className="text-gray-500 text-sm">{entry.date}</span>
        </div>
        
        <ul className="space-y-2">
          {entry.changes.map((change, index) => (
            <li key={index} className="flex items-center gap-3">
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold ${getTagStyle(change.type)}`}>
                {getTagIcon(change.type)}
                {getTagText(change.type)}
              </span>
              <span className="text-gray-300 text-sm">{change.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Changelog;
