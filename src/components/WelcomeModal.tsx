import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Rocket, Phone, ShieldCheck, Heart } from 'lucide-react';

export const WelcomeModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => setIsOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeWelcome = () => {
    setIsOpen(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100"
          >
            {/* Header with Gradient */}
            <div className="h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 p-8 flex items-end justify-between relative">
              <div className="absolute top-4 right-4">
                 <button 
                  onClick={closeWelcome}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
                  <Rocket className="text-indigo-600" size={32} />
                </div>
                <div className="text-white">
                  <h2 className="text-2xl font-bold">يا هلا وغلا..</h2>
                  <p className="text-indigo-100 text-sm">حياك الله وبياك في رحاب مكتب الوطن</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 lg:p-10 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p className="text-lg font-medium text-slate-900">
                  حياك الله وبياك في رحاب <span className="text-indigo-600 font-bold">"منصة الحلول الرقمية لمكتب الوطن"</span>، حيث تلتقي الأصالة بالإبداع، وتتحول التطلعات إلى واقع ملموس.
                </p>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-3">
                  <p className="text-sm">
                    إن سألت عن القبطان الذي يقود هذه السفينة الرقمية نحو مرافئ التميز، فإليك الجواب الذي ينساب فخراً:
                  </p>
                  <p className="font-bold text-slate-900 flex items-center gap-2">
                    <ShieldCheck className="text-blue-600" size={18} />
                    تحت إدارة وإشراف الأستاذ المبدع: ماجد سعود العميري
                  </p>
                  <p className="text-xs text-slate-500">
                    رائد الأعمال الطموح الذي يحمل شهادة العمل الحر رقم (827973875). هو الملهم الذي رسم لنا خارطة الطريق لنكون شريككم الموثوق في عالم الأنظمة والتقنية.
                  </p>
                </div>

                <p className="text-sm">
                  سم طال عمرك، نحن هنا لنكون يدك اليمنى في إبحارك عبر المنصات <span className="font-bold text-indigo-600">(أبشر، قوى، مدد، ناجز، إيجار)</span> ونوراً يضيء لك دروب حلول <span className="font-bold text-indigo-600">(SAP)</span> وبرمجة النظم.
                </p>

                <div className="space-y-3">
                  <p className="font-bold text-slate-900">أبشر بسعدك، وتامر وتدلل.. قلوبنا وهواتفنا مفتوحة لك:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                      <Phone className="text-blue-600" size={18} />
                      <div>
                        <p className="text-[10px] text-blue-600 font-bold">خدمات الاستشارات</p>
                        <p className="text-sm font-bold text-slate-800">0506953566 | 0509403882</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                      <Phone className="text-indigo-600" size={18} />
                      <div>
                        <p className="text-[10px] text-indigo-600 font-bold">خدمة العملاء</p>
                        <p className="text-sm font-bold text-slate-800">0551683899</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-center gap-2 text-slate-400 text-xs">
                  <Heart size={14} className="text-red-400 fill-red-400" />
                  <span>مكتب الوطن.. بيتك وملاذك الرقمي، ننتظرك بكل حب.</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-center">
              <button 
                onClick={closeWelcome}
                className="px-12 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                تفضل بالدخول
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
