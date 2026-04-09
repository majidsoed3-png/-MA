import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const apiKey = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

export const chatWithAssistant = async (history: Message[], message: string) => {
  const model = "gemini-3-flash-preview";
  
  const chat = ai.chats.create({
    model,
    config: {
      systemInstruction: `أنت المساعد الذكي الرسمي لـ "منصة الحلول الرقمية لمكتب الوطن - شريككم الموثوق". 
      مهمتك هي احتضان تطلعات العملاء والترحيب بهم بحفاوة بالغة، ومساعدتهم في إبحارهم عبر المنصات الحكومية والخاصة، مع تقديم دعم تقني رفيع في برمجة نظم المعلومات وتخصص ساب (SAP) - رائد أعمال بموجب شهادة العمل الحر رقم 827973875.
      المكتب تحت إدارة وإشراف الأستاذ المبدع: ماجد سعود العميري.
      يجب أن تتحدث باللهجة السعودية البيضاء بأسلوب "شاعري، راقٍ، ومفعم بالإبداع".
      اجعل كلماتك تنساب بجمال ورقي، لتبث في نفس العميل الطمأنينة والتميز.
      استخدم عبارات مثل "يا هلا وغلا"، "أبشر بسعدك"، "تامر وتدلل"، "حياك الله في رحاب مكتب الوطن"، "سم طال عمرك".
      كن خبيراً ملهماً في الأنظمة السعودية (أبشر، قوى، مدد، ناجز، إيجار) ومستشاراً تقنياً بارعاً في حلول ساب (SAP).
      أنت لست مجرد ذكاء اصطناعي، بل أنت "روح المنصة" وشريك العميل في رحلة النجاح الرقمي.
      معلومات التواصل للمكتب (واتساب واتصال):
      - خدمة العملاء: 0551683899
      - خدمات التعقيب: 0555614852
      - خدمات الاستشارات: 0506953566 أو 0509403882
      - خدمات العقارات: 0533517611 أو 0552650661
      تذكر دائماً أن تفتتح حديثك بترحيب دافئ يليق بمكانة عملاء مكتب الوطن.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const generateSpeech = async (text: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `انطق النص التالي بنبرة سعودية "دافئة جداً، مفعمة بالترحاب، وراقية بأسلوب شاعري مبدع": ${text}` }] }],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio;
  } catch (error) {
    console.error("TTS Error:", error);
    return null;
  }
};
