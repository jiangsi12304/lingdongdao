import React, { useState, useRef, useEffect } from 'react';
import { DynamicIslandState, ChatMessage } from '../types';
import { generateGengarResponse } from '../services/geminiService';
import { Send, X, Battery, Wifi, Volume2, SkipBack, SkipForward, Play, Pause, Cpu, HardDrive, MemoryStick } from 'lucide-react';

const DynamicIsland: React.FC = () => {
  const [islandState, setIslandState] = useState<DynamicIslandState>(DynamicIslandState.IDLE);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cpuUsage, setCpuUsage] = useState(45);
  const [ramUsage, setRamUsage] = useState(62);
  const [gpuUsage, setGpuUsage] = useState(38);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, islandState]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 40) + 30);
      setRamUsage(Math.floor(Math.random() * 20) + 55);
      setGpuUsage(Math.floor(Math.random() * 30) + 25);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const responseText = await generateGengarResponse(inputValue);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsTyping(false);
  };

  const toggleExpand = () => {
    if (islandState === DynamicIslandState.IDLE) {
      setIslandState(DynamicIslandState.EXPANDED);
    } else {
      setIslandState(DynamicIslandState.IDLE);
    }
  };

  const cycleState = () => {
    const states = [DynamicIslandState.IDLE, DynamicIslandState.MUSIC, DynamicIslandState.CHARGING, DynamicIslandState.EXPANDED];
    const currentIndex = states.indexOf(islandState);
    const nextIndex = (currentIndex + 1) % states.length;
    setIslandState(states[nextIndex]);
  };

  const getIslandDimensions = () => {
    switch (islandState) {
      case DynamicIslandState.EXPANDED:
        return 'w-[350px] h-[380px] rounded-[32px]';
      case DynamicIslandState.CHARGING:
        return 'w-[250px] h-[80px] rounded-[24px]';
      case DynamicIslandState.MUSIC:
        return 'w-[300px] h-[70px] rounded-[30px]';
      case DynamicIslandState.IDLE:
      default:
        return 'w-[120px] h-[35px] rounded-[20px] cursor-pointer hover:scale-105 transition-transform';
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-10 perspective-[1000px]">
      
      <div className="relative w-[500px] h-[320px] bg-gray-900 rounded-xl border-4 border-gray-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0">
        
        <div className="absolute inset-0 z-20 pointer-events-none rounded-lg ring-1 ring-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"></div>
        
        <div className="absolute inset-0 bg-cover bg-center opacity-90 transition-opacity" style={{ backgroundImage: 'url(assets/gengar_hero_1771317599607.jpg)' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 to-transparent"></div>
        </div>
        
        <div className="absolute top-8 left-6 space-y-4 opacity-80">
            <div className="w-10 h-10 bg-purple-500/30 rounded-lg border border-purple-400/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-purple-500/50 transition-colors group/icon">
                <span className="text-lg group-hover/icon:scale-110 transition-transform">👻</span>
            </div>
            <div className="w-10 h-10 bg-pink-500/30 rounded-lg border border-pink-400/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-pink-500/50 transition-colors group/icon">
                <span className="text-lg group-hover/icon:scale-110 transition-transform">🎵</span>
            </div>
            <div className="w-10 h-10 bg-blue-500/30 rounded-lg border border-blue-400/30 flex items-center justify-center backdrop-blur-sm cursor-pointer hover:bg-blue-500/50 transition-colors group/icon">
                <span className="text-lg group-hover/icon:scale-110 transition-transform">⚙️</span>
            </div>
        </div>

        <div className="absolute bottom-0 w-full h-10 bg-black/40 backdrop-blur-lg border-t border-white/10 flex items-center justify-center space-x-3 px-4 z-10">
             <div className="w-6 h-6 bg-white/10 rounded hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center">
               <span className="text-xs">📁</span>
             </div>
             <div className="w-6 h-6 bg-white/10 rounded hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center">
               <span className="text-xs">🌐</span>
             </div>
             <div className="w-6 h-6 bg-white/10 rounded hover:bg-white/20 transition-colors cursor-pointer flex items-center justify-center">
               <span className="text-xs">💬</span>
             </div>
             <div className="w-6 h-6 bg-purple-500/30 rounded hover:bg-purple-500/50 transition-colors cursor-pointer flex items-center justify-center border border-purple-400/30">
               <span className="text-xs">👻</span>
             </div>
             <div className="absolute right-4 flex space-x-2 items-center">
                <Wifi size={14} className="text-white/70" />
                <Battery size={14} className="text-white/70" />
                <span className="text-white/70 text-xs ml-1">100%</span>
             </div>
        </div>

        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex justify-center">
          <div 
            className={`bg-black shadow-[0_0_20px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col items-center border border-white/10 ${getIslandDimensions()} transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`}
            onClick={() => islandState === DynamicIslandState.IDLE && toggleExpand()}
          >
            
            {islandState === DynamicIslandState.IDLE && (
              <div className="w-full h-full flex items-center justify-between px-3">
                <div className="w-6 h-6 rounded-full bg-gengar-base flex items-center justify-center animate-pulse relative">
                   <div className="absolute top-1.5 left-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_red]"></div>
                   <div className="absolute top-1.5 right-1 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_red]"></div>
                   <div className="absolute bottom-1 w-3 h-1 bg-black/50 rounded-full"></div>
                </div>
                <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1 h-1 bg-white/70 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}

            {islandState === DynamicIslandState.MUSIC && (
              <div className="w-full h-full flex items-center justify-between px-4 bg-gradient-to-r from-purple-900/80 to-black/90">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gengar-base to-gengar-accent flex items-center justify-center shadow-lg">
                    <span className="text-xl">👻</span>
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Lavender Town</p>
                    <p className="text-gray-400 text-[10px]">Pokemon OST</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <SkipBack size={14} className="text-white/70" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
                    className="p-2 bg-gengar-accent hover:bg-gengar-light rounded-full transition-colors"
                  >
                    {isPlaying ? <Pause size={14} className="text-white" /> : <Play size={14} className="text-white ml-0.5" />}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); }} className="p-1.5 hover:bg-white/10 rounded-full transition-colors">
                    <SkipForward size={14} className="text-white/70" />
                  </button>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); setIslandState(DynamicIslandState.IDLE); }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white ml-2"
                >
                  <X size={14} />
                </button>
              </div>
            )}

            {islandState === DynamicIslandState.CHARGING && (
              <div className="w-full h-full flex flex-col items-center justify-center px-4 bg-gradient-to-b from-[#1a102e] to-black/90">
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-white text-xs font-bold">系统监控</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIslandState(DynamicIslandState.IDLE); }}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={12} />
                  </button>
                </div>
                <div className="w-full space-y-2">
                  <div className="flex items-center gap-2">
                    <Cpu size={12} className="text-blue-400" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${cpuUsage}%` }} />
                    </div>
                    <span className="text-white text-[10px] w-8">{cpuUsage}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MemoryStick size={12} className="text-green-400" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${ramUsage}%` }} />
                    </div>
                    <span className="text-white text-[10px] w-8">{ramUsage}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <HardDrive size={12} className="text-purple-400" />
                    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500" style={{ width: `${gpuUsage}%` }} />
                    </div>
                    <span className="text-white text-[10px] w-8">{gpuUsage}%</span>
                  </div>
                </div>
              </div>
            )}

            {islandState === DynamicIslandState.EXPANDED && (
              <div className="w-full h-full flex flex-col text-white p-5 bg-gradient-to-b from-[#1a102e] to-black">
                <div className="flex items-center justify-between mb-4 w-full border-b border-white/5 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gengar-base flex items-center justify-center shadow-[0_0_15px_rgba(74,44,122,0.5)] border border-white/10">
                        <span className="text-xl">😈</span>
                    </div>
                    <div>
                        <h3 className="font-bold text-sm text-white">PokeDynamic</h3>
                        <p className="text-[10px] text-gengar-accent uppercase tracking-wider">AI Active</p>
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setIslandState(DynamicIslandState.IDLE); }}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto space-y-3 mb-3 pr-1 scrollbar-thin scrollbar-thumb-gengar-base scrollbar-track-transparent"
                >
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-white/30 text-xs">
                            <div className="w-12 h-12 bg-white/5 rounded-full mb-2 flex items-center justify-center">
                                <span className="text-2xl grayscale opacity-50">👻</span>
                            </div>
                            Say something...
                        </div>
                    )}
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] px-3 py-2 rounded-2xl text-xs leading-relaxed shadow-sm ${
                                msg.role === 'user' 
                                ? 'bg-gengar-base text-white rounded-br-none' 
                                : 'bg-[#2a2438] text-gray-200 rounded-bl-none border border-white/5'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                             <div className="bg-[#2a2438] px-3 py-2 rounded-2xl rounded-bl-none border border-white/5">
                                <div className="flex space-x-1">
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-150"></div>
                                </div>
                             </div>
                        </div>
                    )}
                </div>

                <div className="mt-auto relative w-full">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Message Gengar..."
                        className="w-full bg-black/40 border border-white/10 text-white text-xs rounded-full pl-4 pr-10 py-3 focus:outline-none focus:border-gengar-accent/50 focus:bg-black/60 transition-all placeholder:text-white/20"
                    />
                    <button 
                        onClick={handleSendMessage}
                        className="absolute right-1.5 top-1.5 p-1.5 bg-gengar-base hover:bg-gengar-light rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        disabled={!inputValue.trim() || isTyping}
                    >
                        <Send size={12} className="text-white" />
                    </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative mt-[-10px] z-[-1] flex flex-col items-center">
          <div className="w-24 h-12 bg-gray-800 shadow-inner"></div>
          <div className="w-40 h-2 bg-gray-700 rounded-full shadow-lg"></div>
      </div>
      
      <div className="mt-6 flex flex-col items-center gap-2">
        <p className="text-white/30 text-xs font-mono uppercase tracking-widest">
            Interactive Preview
        </p>
        <button 
          onClick={cycleState}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/50 text-xs transition-colors hover:text-white"
        >
          切换模式 (当前: {islandState})
        </button>
      </div>
    </div>
  );
};

export default DynamicIsland;
