import React, { useState } from 'react';
import { Plus, CheckCircle2, Circle, Clock, AlertCircle, Trash2 } from 'lucide-react';
import { Task } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', priority: 'medium' as Task['priority'] });

  const addTask = () => {
    if (!newTask.title.trim()) return;
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: '',
      status: 'pending',
      priority: newTask.priority,
      dueDate: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    setTasks([task, ...tasks]);
    setNewTask({ title: '', priority: 'medium' });
    setShowAdd(false);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6" id="task-manager">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <CheckCircle2 className="text-blue-600" />
          الخدمات والمعاملات
        </h3>
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <input 
                type="text" 
                placeholder="ما هي المهمة الجديدة؟"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={newTask.title}
                onChange={e => setNewTask({...newTask, title: e.target.value})}
                onKeyPress={e => e.key === 'Enter' && addTask()}
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {(['low', 'medium', 'high'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setNewTask({...newTask, priority: p})}
                      className={`text-[10px] px-2 py-1 rounded-full border transition-all ${
                        newTask.priority === p 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {p === 'low' ? 'منخفضة' : p === 'medium' ? 'متوسطة' : 'عالية'}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={addTask}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700"
                >
                  إضافة
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <Clock size={40} className="mx-auto mb-2 opacity-20" />
            <p className="text-sm">لا توجد مهام حالية. ابدأ بإضافة واحدة!</p>
          </div>
        ) : (
          tasks.map(task => (
            <motion.div 
              layout
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                task.status === 'completed' ? 'bg-slate-50 border-slate-100 opacity-60' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="flex items-center gap-3">
                <button onClick={() => toggleTask(task.id)} className="text-blue-600">
                  {task.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </button>
                <div>
                  <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      task.priority === 'high' ? 'bg-red-50 text-red-600' : 
                      task.priority === 'medium' ? 'bg-orange-50 text-orange-600' : 
                      'bg-green-50 text-green-600'
                    }`}>
                      {task.priority === 'high' ? 'عالية' : task.priority === 'medium' ? 'متوسطة' : 'منخفضة'}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {format(new Date(task.createdAt), 'd MMMM', { locale: ar })}
                    </span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-slate-300 hover:text-red-500 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
