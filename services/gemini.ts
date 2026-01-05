
import { GoogleGenAI } from "@google/genai";
import { Persona, UserFormData } from "../types";

/**
 * Generates personalized investment advice using Gemini AI.
 * Follows the latest @google/genai SDK guidelines.
 */
export const generatePersonalizedAdvice = async (
  persona: Persona,
  user: UserFormData,
  score: number
) => {
  // Always obtain the API key exclusively from process.env.API_KEY.
  // Create a new GoogleGenAI instance right before making an API call.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      // Using gemini-3-flash-preview for basic text tasks.
      model: "gemini-3-flash-preview",
      contents: `
        請以專業理財顧問的身份，為以下用戶提供一份簡短的投資心理與策略分析。
        投資現況 (配比): ${user.allocation}
        測驗得分: ${score}
        投資人格類型: ${persona.title}
        性格描述: ${persona.desc}
        
        請用繁體中文撰寫，字數約 200 字。分析包含：
        1. 您的投資心理優勢與盲點。
        2. 針對您的風險等級 (${persona.riskLevel}/3) 提供的核心配置建議。
        3. 給用戶的一句鼓勵性理財格言。
      `,
      config: {
        temperature: 0.7,
      },
    });

    // Directly access the .text property as per the latest SDK spec.
    return response.text || "無法取得建議。";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "AI 分析暫時不可用，但根據您的分數，建議您穩步佈局核心與衛星資產組合。";
  }
};
