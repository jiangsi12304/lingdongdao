import React, { useState } from 'react';
import { ChevronDown, Music, Bot, Bell, Palette, Shield } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const faqData: FAQItem[] = [
  {
    icon: <Music className="text-green-400" size={18} />,
    question: "PokeDynamic 支持哪些音乐播放器？",
    answer: "目前支持网易云音乐、QQ音乐、酷狗音乐、Spotify、Apple Music 等主流播放器。我们正在持续添加更多播放器支持。"
  },
  {
    icon: <Bot className="text-pink-400" size={18} />,
    question: "如何配置 AI 助手功能？",
    answer: "在设置中找到「AI 助手」选项，输入你的豆包 API Key 即可启用。首次使用会引导你完成配置流程。"
  },
  {
    icon: <Bell className="text-yellow-400" size={18} />,
    question: "为什么通知镜像需要额外权限？",
    answer: "通知镜像需要读取系统通知的权限才能正常工作。你可以在 Windows 设置 → 隐私 → 通知中开启相应权限。"
  },
  {
    icon: <Palette className="text-purple-400" size={18} />,
    question: "可以自定义耿鬼的动画效果吗？",
    answer: "当然可以！在设置中你可以调整动画速度、颜色主题，甚至上传自定义的精灵图片（支持 PNG 格式）。"
  },
  {
    icon: <Shield className="text-blue-400" size={18} />,
    question: "软件会收集我的个人数据吗？",
    answer: "不会。PokeDynamic 完全本地运行，不会收集或上传任何个人数据。所有数据都保存在你的本地设备上。"
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 md:px-20 bg-gradient-to-b from-[#0f0a1e] to-[#0a0812] relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gengar-light to-gengar-accent">常见问题</span>
            <span className="hidden md:inline text-gray-700 font-thin text-3xl mx-3">/</span>
            <span className="text-white">FAQ</span>
          </h2>
          <p className="text-gray-400">快速找到你需要的答案</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index}
              className={`glass-panel rounded-2xl border transition-all duration-300 ${
                openIndex === index 
                  ? 'border-gengar-accent/50' 
                  : 'border-white/10 hover:border-gengar-light/30'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-white font-medium">{item.question}</span>
                </div>
                <ChevronDown 
                  size={20} 
                  className={`text-gengar-accent transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6 pt-0">
                  <div className="pl-14">
                    <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
