import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Volume2, VolumeX } from 'lucide-react';
import { chatWithAssistant, generateSpeech } from '../lib/gemini';
import { Message } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';

export const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: 'يا هلا ومرحبا بك في منصة الحلول الرقمية لمكتب الوطن.. نسعد بخدمتكم في كل ما يخص المنصات الحكومية والخاصة وبرمجة نظم المعلومات تخصص ساب (رائد أعمال بموجب شهادة العمل الحر رقم 827973875)، تحت إدارة وإشراف الأستاذ ماجد سعود العميري. أبشر بسعدك، أنا هنا شريكك الموثوق.. كيف أقدر أخدمك اليوم بكل رقي وإبداع؟',
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const placeholders = [
    "كيف أقدر أخدمك في منصة أبشر اليوم؟",
    "هل تبي تسجل في منصة قوى؟ أبشر بسعدك..",
    "استفسر عن خدمات ساب (SAP) والحلول البرمجية..",
    "كيف نوثق عقدك في منصة إيجار بكل سهولة؟",
    "تبي تعرف شروط التقديم في ناجز؟ تامر وتدلل..",
    "مكتب الوطن يرحب بك.. كيف نصنع لك حلاً رقمياً مبدعاً؟",
    "استشرنا في الأنظمة التقنية وبرمجة المعلومات..",
    "حياك الله.. كيف نسهل لك معاملاتك الحكومية اليوم؟"
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const playAudio = async (base64Data: string) => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      
      const binaryString = window.atob(base64Data);
      const len = binaryString.length;
      const bytes = new Int16Array(len / 2);
      for (let i = 0; i < len; i += 2) {
        bytes[i / 2] = (binaryString.charCodeAt(i + 1) << 8) | binaryString.charCodeAt(i);
      }

      const audioBuffer = audioContextRef.current.createBuffer(1, bytes.length, 24000);
      const channelData = audioBuffer.getChannelData(0);
      for (let i = 0; i < bytes.length; i++) {
        channelData[i] = bytes[i] / 32768.0;
      }

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      source.start();
    } catch (error) {
      console.error('Error playing audio:', error);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await chatWithAssistant(messages, input);
      const assistantMessage: Message = {
        role: 'model',
        text: responseText || 'عذراً، حدث خطأ ما.',
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      if (isVoiceEnabled && responseText) {
        // Clean text for TTS (remove markdown symbols)
        const cleanText = responseText.replace(/[*_#`]/g, '');
        const audioData = await generateSpeech(cleanText);
        if (audioData) {
          await playAudio(audioData);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: 'عذراً، واجهت مشكلة في الاتصال. يرجى المحاولة مرة أخرى.',
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden" id="chat-assistant">
      <div className="bg-slate-900 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500 p-2 rounded-lg">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">المدير الافتراضي (سعودي)</h3>
            <p className="text-xs text-slate-400">متصل الآن ومستعد للمساعدة</p>
          </div>
        </div>
        <button 
          onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
          className={`p-2 rounded-lg transition-colors ${isVoiceEnabled ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-400'}`}
          title={isVoiceEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
        >
          {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white rounded-tl-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tr-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1 opacity-70 text-[10px]">
                  {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
                  <span>{msg.role === 'user' ? 'أنت' : 'المساعد'}</span>
                </div>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-end">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-blue-500" />
              <span className="text-xs text-slate-500">جاري التفكير...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={placeholders[placeholderIndex]}
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
