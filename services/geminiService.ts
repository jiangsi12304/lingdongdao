import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateGengarResponse = async (userMessage: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
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
    return "Gi-gi-gi! (I couldn't reach the spirit world...)";
  }
};