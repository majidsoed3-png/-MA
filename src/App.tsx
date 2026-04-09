import React, { useState } from 'react';
import { LayoutDashboard, MessageSquare, CheckSquare, Calendar as CalendarIcon, Settings, Bell, Search, User, StickyNote, Palette, Rocket, Phone, ShieldCheck, Grid, FileText, Wallet, Package } from 'lucide-react';
import { ChatAssistant } from './components/ChatAssistant';
import { TaskManager } from './components/TaskManager';
import { Calendar } from './components/Calendar';
import { NotesManager } from './components/NotesManager';
import { ContactInfo } from './components/ContactInfo';
import { PlatformShowcase } from './components/PlatformShowcase';
import { WelcomeModal } from './components/WelcomeModal';
import { DocumentManager } from './components/DocumentManager';
import { FinanceManager } from './components/FinanceManager';
import { AssetManager } from './components/AssetManager';
import { motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'لوحة التحكم' },
    { id: 'platforms', icon: Grid, label: 'دليل المنصات' },
    { id: 'services', icon: CheckSquare, label: 'الخدمات الإلكترونية' },
    { id: 'documents', icon: FileText, label: 'الأوراق والمستندات' },
    { id: 'finance', icon: Wallet, label: 'الحسابات والمالية' },
    { id: 'assets', icon: Package, label: 'الأصول والممتلكات' },
    { id: 'calendar', icon: CalendarIcon, label: 'المواعيد' },
    { id: 'contact', icon: Phone, label: 'تواصل معنا' },
    { id: 'assistant', icon: MessageSquare, label: 'المساعد الذكي' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100" dir="rtl">
      <WelcomeModal />
      {/* Sidebar */}
      <aside className="fixed right-0 top-0 h-screen w-20 lg:w-64 bg-white border-l border-slate-200 z-50 transition-all">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <Rocket size={24} />
          </div>
          <div className="hidden lg:block">
            <span className="font-bold text-lg leading-tight text-slate-800 block">منصة الحلول الرقمية</span>
            <span className="text-[10px] text-indigo-600 font-bold">مكتب الوطن - شريككم الموثوق</span>
          </div>
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-100' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              <item.icon size={20} />
              <span className="hidden lg:block font-medium text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-8 left-0 right-0 px-4">
          <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all">
            <Settings size={20} />
            <span className="hidden lg:block font-medium text-sm">الإعدادات</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="mr-20 lg:mr-64 p-4 lg:p-8 transition-all">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">منصة الحلول الرقمية لمكتب الوطن</h1>
            <p className="text-slate-500 text-sm">الخدمات الإلكترونية المساندة وبرمجة نظم المعلومات (تخصص ساب) - رائد أعمال بموجب شهادة العمل الحر رقم 827973875 تحت إدارة وإشراف الأستاذ ماجد سعود العميري.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden md:block">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="بحث..." 
                className="bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
              />
            </div>
            <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 left-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-2 p-1 pr-3 bg-white border border-slate-200 rounded-xl">
              <span className="text-xs font-bold text-slate-700 hidden sm:block">ماجد سعيد</span>
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                <User size={18} />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column: Dashboard/Tasks */}
          <div className="xl:col-span-2 space-y-8">
            {activeTab === 'dashboard' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <PlatformShowcase />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <TaskManager />
                  <Calendar />
                </div>
                <ContactInfo />
              </motion.div>
            )}
            {activeTab === 'platforms' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <PlatformShowcase />
              </motion.div>
            )}
            {activeTab === 'services' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <TaskManager />
              </motion.div>
            )}
            {activeTab === 'documents' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DocumentManager />
              </motion.div>
            )}
            {activeTab === 'finance' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <FinanceManager />
              </motion.div>
            )}
            {activeTab === 'assets' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AssetManager />
              </motion.div>
            )}
            {activeTab === 'calendar' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Calendar />
              </motion.div>
            )}
            {activeTab === 'contact' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ContactInfo />
              </motion.div>
            )}
            {activeTab === 'assistant' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <ChatAssistant />
              </motion.div>
            )}
          </div>

          {/* Right Column: AI Assistant (Always visible on large screens or specific tab) */}
          <div className="space-y-8">
            {activeTab !== 'assistant' && (
              <div className="hidden xl:block sticky top-8">
                <ChatAssistant />
              </div>
            )}
            {activeTab === 'assistant' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white shadow-xl">
                  <h3 className="font-bold mb-2 flex items-center gap-2">
                    <ShieldCheck size={18} />
                    شعارنا
                  </h3>
                  <p className="text-sm text-indigo-100 leading-relaxed">
                    "نحرص على خدمتكم بكفاءة واحترافية، لتسهيل إنجاز معاملاتكم."
                  </p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm">إحصائيات الأسبوع</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-500">المهام المنجزة</span>
                        <span className="text-blue-600 font-bold">85%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 w-[85%]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-500">ساعات العمل الفعلي</span>
                        <span className="text-indigo-600 font-bold">32 ساعة</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-600 w-[65%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
