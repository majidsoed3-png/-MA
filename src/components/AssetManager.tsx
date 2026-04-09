import React, { useState } from 'react';
import { Package, Search, Plus, MoreVertical, Tag, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

interface Asset {
  id: string;
  name: string;
  category: string;
  location: string;
  purchaseDate: string;
  value: number;
  status: 'available' | 'in-use' | 'maintenance';
}

export const AssetManager: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([
    { id: '1', name: 'جهاز كمبيوتر محمول Dell XPS', category: 'أجهزة إلكترونية', location: 'المكتب الرئيسي', purchaseDate: '2023-05-10', value: 5500, status: 'in-use' },
    { id: '2', name: 'طابعة HP LaserJet', category: 'أجهزة مكتبية', location: 'غرفة السكرتارية', purchaseDate: '2023-08-15', value: 1200, status: 'available' },
    { id: '3', name: 'طقم مكاتب وكراسي جلد', category: 'أثاث', location: 'المكتب الرئيسي', purchaseDate: '2023-01-20', value: 8000, status: 'in-use' },
    { id: '4', name: 'خادم بيانات (Server)', category: 'بنية تحتية', location: 'غرفة السيرفر', purchaseDate: '2024-01-05', value: 15000, status: 'maintenance' },
  ]);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Package className="text-orange-600" size={20} />
            الأصول والممتلكات (العهد)
          </h2>
          <p className="text-xs text-slate-500 mt-1">إدارة جميع ممتلكات وأصول مكتب الوطن</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-orange-700 transition-all shadow-md shadow-orange-100">
            <Plus size={16} />
            إضافة أصل جديد
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {assets.map((asset) => (
          <motion.div 
            key={asset.id}
            whileHover={{ y: -4 }}
            className="p-4 bg-slate-50 rounded-2xl border border-slate-100 relative group"
          >
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1 text-slate-400 hover:text-slate-600">
                <MoreVertical size={16} />
              </button>
            </div>
            
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-600 mb-4 shadow-sm">
              <Package size={20} />
            </div>
            
            <h3 className="font-bold text-slate-800 text-sm mb-1">{asset.name}</h3>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-3">
              <Tag size={10} />
              {asset.category}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <MapPin size={10} /> الموقع
                </span>
                <span className="text-slate-700 font-medium">{asset.location}</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400 flex items-center gap-1">
                  <Calendar size={10} /> التاريخ
                </span>
                <span className="text-slate-700 font-medium">{asset.purchaseDate}</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <span className="text-slate-400">القيمة التقديرية</span>
                <span className="text-orange-600 font-bold">{asset.value.toLocaleString()} ر.س</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                asset.status === 'available' ? 'bg-green-50 text-green-600' :
                asset.status === 'in-use' ? 'bg-blue-50 text-blue-600' :
                'bg-orange-50 text-orange-600'
              }`}>
                {asset.status === 'available' ? 'متاح' : 
                 asset.status === 'in-use' ? 'قيد الاستخدام' : 'تحت الصيانة'}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
