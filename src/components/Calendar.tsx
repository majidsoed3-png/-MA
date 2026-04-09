import React from 'react';
import { Calendar as CalendarIcon, MapPin, Clock } from 'lucide-react';
import { Appointment } from '../types';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const Calendar: React.FC = () => {
  const appointments: Appointment[] = [
    {
      id: '1',
      title: 'اجتماع مجلس الإدارة',
      time: '2026-04-06T10:00:00',
      location: 'غرفة الاجتماعات الرئيسية',
      description: 'مناقشة خطة الربع الثاني',
    },
    {
      id: '2',
      title: 'غداء عمل مع العميل',
      time: '2026-04-06T13:30:00',
      location: 'مطعم الساحة',
    },
    {
      id: '3',
      title: 'مراجعة التقارير المالية',
      time: '2026-04-07T09:00:00',
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6" id="calendar-widget">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <CalendarIcon className="text-blue-600" />
          جدول المراجعات
        </h3>
        <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
          {format(new Date(), 'EEEE, d MMMM', { locale: ar })}
        </span>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="relative pr-4 border-r-2 border-blue-100 hover:border-blue-500 transition-colors py-1">
            <div className="absolute -right-[5px] top-2 w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" />
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-sm font-bold text-slate-800">{apt.title}</h4>
                <div className="flex flex-wrap gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock size={12} />
                    {format(new Date(apt.time), 'p', { locale: ar })}
                  </div>
                  {apt.location && (
                    <div className="flex items-center gap-1 text-[10px] text-slate-500">
                      <MapPin size={12} />
                      {apt.location}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                قريباً
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 text-xs font-bold text-slate-400 border border-dashed border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
        عرض التقويم الكامل
      </button>
    </div>
  );
};
