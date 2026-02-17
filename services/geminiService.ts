const GENGAR_RESPONSES = [
  "Heheh! Gengar! 👻",
  "Gi-gi-gi! 有趣的问题...",
  "Gengar! 你想和我一起恶作剧吗？👻",
  "嘿嘿嘿... 耿鬼饿了！",
  "Gengar gengar! 我在看着你哦... 👁️",
  "Gi-gi-gi! 让我们玩个游戏吧！",
  "Heheh! 你的灵魂看起来很美味...",
  "Gengar! 我感觉到你的恐惧了... 开玩笑的！👻",
  "嘿嘿嘿... 想要和我做朋友吗？",
  "Gengar! 今天是个恶作剧的好日子！",
  "Gi-gi-gi! 你看起来很有趣！",
  "Heheh! 耿鬼喜欢你的风格！",
];

const getApiKey = (): string | null => {
  if (typeof window !== 'undefined') {
    return (window as any).GEMINI_API_KEY || null;
  }
  return process.env.API_KEY || process.env.GEMINI_API_KEY || null;
};

export const generateGengarResponse = async (userMessage: string): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
    
    const randomIndex = Math.floor(Math.random() * GENGAR_RESPONSES.length);
    return GENGAR_RESPONSES[randomIndex];
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are Gengar (耿鬼), the Shadow Pokémon. 
        You are mischievous, playful, and a little spooky, but loyal to your trainer. 
        Your responses should be short, punchy, and suitable for a small notification screen (Dynamic Island). 
        Include sounds like "Heheh!", "Gengar!", "Gi-gi-gi!" occasionally. 
        Speak in a mix of spooky and cute.
        If the user asks about the app features, mention that you can track battery, play music, and notify them of messages.
        Keep responses under 20 words if possible.`,
      },
    });

    return response.text || "Gengar... gengar? (Something went wrong...)";
  } catch (error) {
    console.error("Gemini API Error:", error);
    const randomIndex = Math.floor(Math.random() * GENGAR_RESPONSES.length);
    return GENGAR_RESPONSES[randomIndex];
  }
};
