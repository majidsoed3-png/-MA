import React from 'react';
import { Phone, User, Building2, Gavel, Home, ExternalLink, MessageCircle } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  const contacts = [
    { title: 'خدمة العملاء', numbers: ['0551683899'], icon: User, color: 'bg-blue-50 text-blue-600' },
    { title: 'خدمات التعقيب', numbers: ['0555614852'], icon: Building2, color: 'bg-indigo-50 text-indigo-600' },
    { title: 'خدمات الاستشارات', numbers: ['0506953566', '0509403882'], icon: Gavel, color: 'bg-purple-50 text-purple-600' },
    { title: 'خدمات العقارات', numbers: ['0533517611', '0552650661'], icon: Home, color: 'bg-orange-50 text-orange-600' },
  ];

  const formatWhatsAppUrl = (num: string) => {
    // Remove leading zero and add country code 966
    const cleanNum = num.startsWith('0') ? `966${num.slice(1)}` : num;
    return `https://wa.me/${cleanNum}`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6" id="contact-info">
      <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Phone className="text-blue-600" />
        طرق التواصل مع مكتب الوطن
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contacts.map((contact, idx) => (
          <div key={idx} className="p-4 rounded-xl border border-slate-50 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${contact.color}`}>
                <contact.icon size={18} />
              </div>
              <h4 className="font-bold text-sm text-slate-800">{contact.title}</h4>
            </div>
            <div className="space-y-2">
              {contact.numbers.map((num, nIdx) => (
                <div key={nIdx} className="flex items-center justify-between gap-2">
                  <a 
                    href={`tel:${num}`}
                    className="flex-1 flex items-center justify-between text-xs text-slate-600 hover:text-blue-600 transition-colors bg-white p-2 rounded-lg border border-slate-100"
                  >
                    <span className="font-mono">{num}</span>
                    <Phone size={12} />
                  </a>
                  <a 
                    href={formatWhatsAppUrl(num)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm"
                    title="تواصل عبر واتساب"
                  >
                    <MessageCircle size={14} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 bg-blue-600 rounded-xl text-white">
        <p className="text-xs text-blue-100 mb-1">تحت إدارة وإشراف الأستاذ:</p>
        <h4 className="font-bold text-lg">ماجد سعود العميري</h4>
      </div>
    </div>
  );
};
