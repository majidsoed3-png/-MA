import React, { useState } from 'react';
import { ShieldCheck, Building2, Gavel, Home, Briefcase, FileText, Info, ChevronDown, ChevronUp, Code, Grid, Rocket } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Platform {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  documents: string[];
  conditions: string[];
}

export const PlatformShowcase: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const platforms: Platform[] = [
    {
      id: 'absher',
      name: 'منصة أبشر',
      icon: ShieldCheck,
      color: 'from-green-500 to-emerald-600',
      description: 'بوابتك لخدمات وزارة الداخلية والأحوال المدنية والجوازات.',
      documents: ['الهوية الوطنية / الإقامة', 'رقم الجوال المسجل', 'العنوان الوطني المحدث'],
      conditions: ['وجود حساب نشط في أبشر', 'تحديث البيانات الشخصية دورياً'],
    },
    {
      id: 'qiwa',
      name: 'منصة قوى',
      icon: Briefcase,
      color: 'from-blue-600 to-indigo-700',
      description: 'المنصة الموحدة لخدمات قطاع العمل والمنشآت التجارية.',
      documents: ['السجل التجاري ساري المفعول', 'بيانات المنشأة والملف الضريبي', 'هوية صاحب العمل'],
      conditions: ['التسجيل في التأمينات الاجتماعية', 'سريان السجل التجاري'],
    },
    {
      id: 'najiz',
      name: 'منصة ناجز',
      icon: Gavel,
      color: 'from-emerald-700 to-teal-800',
      description: 'الخدمات العدلية والقضائية المتكاملة لوزارة العدل.',
      documents: ['رقم الهوية', 'رقم الصك (للعقارات)', 'الوكالات الشرعية الموثقة'],
      conditions: ['التفعيل عبر النفاذ الوطني الموحد', 'وجود وكالة سارية المفعول'],
    },
    {
      id: 'ejar',
      name: 'منصة إيجار',
      icon: Home,
      color: 'from-indigo-500 to-purple-600',
      description: 'توثيق العقود الإيجارية وتنظيم القطاع العقاري بالمملكة.',
      documents: ['صك الملكية الإلكتروني', 'هوية المؤجر والمستأجر', 'بيانات العقار التفصيلية'],
      conditions: ['وجود حساب في إيجار', 'سداد رسوم التوثيق المقررة'],
    },
    {
      id: 'sap',
      name: 'حلول ساب (SAP)',
      icon: Code,
      color: 'from-blue-400 to-cyan-600',
      description: 'برمجة نظم المعلومات وتطوير الأنظمة التقنية المتخصصة.',
      documents: ['مخطط متطلبات النظام', 'بيانات الشركة التقنية', 'تراخيص البرمجيات الحالية'],
      conditions: ['تحديد نطاق العمل التقني', 'الموافقة على الشروط البرمجية'],
    },
    {
      id: 'balady',
      name: 'منصة بلدي',
      icon: Building2,
      color: 'from-green-400 to-lime-600',
      description: 'الخدمات البلدية الشاملة والتراخيص الإنشائية والتجارية.',
      documents: ['رخصة البناء المعتمدة', 'الكروكي المساحي الحديث', 'صك الأرض المحدث'],
      conditions: ['الالتزام بالكود السعودي للمباني', 'سداد الرسوم البلدية المستحقة'],
    }
  ];

  return (
    <div className="space-y-8" id="platform-showcase">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-r-4 border-indigo-600 pr-6">
        <div>
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <Grid className="text-indigo-600" size={32} />
            دليل المنصات الرقمية
          </h3>
          <p className="text-sm text-slate-500 mt-1 font-medium italic">استكشف المتطلبات والشروط لإنجاز معاملاتك بكل احترافية</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full border border-indigo-100">تحديث يومي</span>
          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full border border-blue-100">دعم فني 24/7</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {platforms.map((platform) => (
          <motion.div
            key={platform.id}
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            className={`relative bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 transition-all overflow-hidden flex flex-col ${
              expandedId === platform.id ? 'ring-4 ring-indigo-500/20 z-10' : ''
            }`}
          >
            {/* Header Section */}
            <div 
              className="p-6 cursor-pointer flex-1"
              onClick={() => setExpandedId(expandedId === platform.id ? null : platform.id)}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${platform.color} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-200/50 transform group-hover:rotate-6 transition-transform`}>
                  <platform.icon size={32} />
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                  expandedId === platform.id ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'
                }`}>
                  {expandedId === platform.id ? 'مفتوح الآن' : 'عرض التفاصيل'}
                </div>
              </div>

              <h4 className="font-black text-xl text-slate-800 mb-2">{platform.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed min-h-[3rem]">{platform.description}</p>
              
              <div className="mt-6 flex items-center justify-between text-indigo-600">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center">
                      <FileText size={10} className="text-slate-400" />
                    </div>
                  ))}
                  <div className="w-6 h-6 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[8px] font-bold">
                    +5
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs font-black">
                  <span>المتطلبات</span>
                  {expandedId === platform.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {expandedId === platform.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-indigo-50/30 border-t border-indigo-100"
                >
                  <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-100/50">
                        <h5 className="text-sm font-black text-indigo-900 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
                            <FileText size={14} />
                          </div>
                          المستندات المطلوبة
                        </h5>
                        <ul className="space-y-2">
                          {platform.documents.map((doc, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-center gap-3 group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover/item:scale-150 transition-transform" />
                              {doc}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-blue-100/50">
                        <h5 className="text-sm font-black text-blue-900 mb-3 flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <Info size={14} />
                          </div>
                          الشروط والأحكام
                        </h5>
                        <ul className="space-y-2">
                          {platform.conditions.map((cond, i) => (
                            <li key={i} className="text-xs text-slate-600 flex items-center gap-3 group/item">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/item:scale-150 transition-transform" />
                              {cond}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <button className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl text-sm font-black hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2">
                      <Rocket size={18} />
                      ابدأ معاملتك الآن مع مكتب الوطن
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
