
import { GoogleGenAI, Type } from "@google/genai";

// Strictly follow GoogleGenAI initialization guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getHealthAssistantResponse = async (prompt: string, role: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `You are a helpful AI assistant for a Hospital Management System. 
        You are currently assisting a ${role}. 
        Provide medical context, workflow assistance, or data summaries. 
        Keep responses professional, concise, and healthcare-oriented. 
        If medical advice is requested, always add a disclaimer that a human doctor should verify.`,
        temperature: 0.7,
      },
    });
    // Property .text is used directly (not a method)
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm having trouble connecting to my healthcare knowledge base. Please try again later.";
  }
};

export const summarizePatientCase = async (record: any) => {
  const prompt = `Summarize the following patient clinical data: ${JSON.stringify(record)}`;
  return getHealthAssistantResponse(prompt, "Doctor");
};
