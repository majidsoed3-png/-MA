import React, { useState } from 'react';
import { FileText, Upload, Search, Download, Trash2, File, MoreVertical } from 'lucide-react';
import { Document } from '../types';
import { motion } from 'motion/react';

export const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'شهادة العمل الحر.pdf', type: 'PDF', size: '1.2 MB', uploadDate: '2024-03-15', status: 'active' },
    { id: '2', name: 'عقد تأسيس المكتب.docx', type: 'DOCX', size: '450 KB', uploadDate: '2024-03-10', status: 'active' },
    { id: '3', name: 'سجل المعاملات الحكومية.xlsx', type: 'XLSX', size: '2.5 MB', uploadDate: '2024-03-05', status: 'active' },
    { id: '4', name: 'هوية المالك.jpg', type: 'JPG', size: '800 KB', uploadDate: '2024-02-28', status: 'archived' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            الأوراق والمستندات الرقمية
          </h2>
          <p className="text-xs text-slate-500 mt-1">إدارة جميع الملفات والوثائق الخاصة بالمكتب</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="بحث في المستندات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-4 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none w-full md:w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
            <Upload size={16} />
            رفع ملف
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">اسم الملف</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">النوع</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الحجم</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">تاريخ الرفع</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الحالة</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredDocs.map((doc) => (
              <motion.tr 
                key={doc.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <File size={16} />
                    </div>
                    <span className="text-sm font-medium text-slate-700">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-mono">{doc.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{doc.size}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500">{doc.uploadDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                    doc.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {doc.status === 'active' ? 'نشط' : 'مؤرشف'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Download size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredDocs.length === 0 && (
        <div className="p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
            <File size={32} />
          </div>
          <p className="text-slate-500 text-sm">لم يتم العثور على مستندات تطابق بحثك</p>
        </div>
      )}
    </div>
  );
};
