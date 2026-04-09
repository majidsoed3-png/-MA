import React, { useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Plus, Search, Filter, Download, DollarSign, Calendar } from 'lucide-react';
import { Transaction } from '../types';
import { motion } from 'motion/react';

export const FinanceManager: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', description: 'رسوم خدمة منصة أبشر', amount: 150, type: 'income', date: '2024-03-15', category: 'خدمات حكومية' },
    { id: '2', description: 'اشتراك إنترنت المكتب', amount: 299, type: 'expense', date: '2024-03-14', category: 'مصاريف تشغيلية' },
    { id: '3', description: 'برمجة نظام ساب لعميل', amount: 2500, type: 'income', date: '2024-03-12', category: 'برمجة' },
    { id: '4', description: 'أدوات مكتبية وقرطاسية', amount: 120, type: 'expense', date: '2024-03-10', category: 'مصاريف مكتبية' },
    { id: '5', description: 'استشارة تقنية - ماجد العميري', amount: 500, type: 'income', date: '2024-03-08', category: 'استشارات' },
  ]);

  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
              <Wallet size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">الرصيد الحالي</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{balance.toLocaleString()} <span className="text-sm font-normal text-slate-500">ر.س</span></h3>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-green-600 font-bold">
            <TrendingUp size={12} />
            <span>+12% عن الشهر الماضي</span>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
              <TrendingUp size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">إجمالي الإيرادات</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 text-green-600">{totalIncome.toLocaleString()} <span className="text-sm font-normal text-slate-500">ر.س</span></h3>
          <p className="text-[10px] text-slate-400 mt-2">إجمالي المبالغ المحصلة هذا الشهر</p>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-600">
              <TrendingDown size={20} />
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">إجمالي المصروفات</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800 text-red-600">{totalExpense.toLocaleString()} <span className="text-sm font-normal text-slate-500">ر.س</span></h3>
          <p className="text-[10px] text-slate-400 mt-2">إجمالي المصاريف التشغيلية والمكتبية</p>
        </motion.div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <DollarSign className="text-indigo-600" size={20} />
              سجل الحسابات والمعاملات
            </h2>
            <p className="text-xs text-slate-500 mt-1">تتبع التدفقات المالية والمصاريف اليومية</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Filter size={18} />
            </button>
            <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-md shadow-indigo-100">
              <Plus size={16} />
              إضافة معاملة
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الوصف</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">التصنيف</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">التاريخ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">المبلغ</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">النوع</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-slate-700">{t.description}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">{t.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {t.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {t.type === 'income' ? '+' : '-'}{t.amount.toLocaleString()} ر.س
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      t.type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {t.type === 'income' ? 'إيداع' : 'صرف'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
