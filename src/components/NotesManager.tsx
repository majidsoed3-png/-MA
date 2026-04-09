import React, { useState } from 'react';
import { StickyNote, Plus, Trash2, Edit3 } from 'lucide-react';
import { Note } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'أفكار المشروع الجديد',
      content: 'البحث في تقنيات الذكاء الاصطناعي التوليدي وكيفية دمجها في أنظمة إدارة المكاتب.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  const addNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) return;
    const note: Note = {
      id: Math.random().toString(36).substr(2, 9),
      title: newNote.title,
      content: newNote.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes([note, ...notes]);
    setNewNote({ title: '', content: '' });
    setIsAdding(false);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6" id="notes-manager">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <StickyNote className="text-blue-600" />
          المذكرات
        </h3>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="bg-blue-50 text-blue-600 p-2 rounded-lg hover:bg-blue-100 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className="p-4 bg-slate-50 rounded-xl space-y-3">
              <input 
                type="text" 
                placeholder="عنوان المذكرة"
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                value={newNote.title}
                onChange={e => setNewNote({...newNote, title: e.target.value})}
              />
              <textarea 
                placeholder="محتوى المذكرة..."
                rows={3}
                className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                value={newNote.content}
                onChange={e => setNewNote({...newNote, content: e.target.value})}
              />
              <div className="flex justify-end">
                <button 
                  onClick={addNote}
                  className="bg-blue-600 text-white px-4 py-1 rounded-lg text-sm hover:bg-blue-700"
                >
                  حفظ
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-4">
        {notes.map(note => (
          <motion.div 
            layout
            key={note.id}
            className="p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-slate-800 text-sm">{note.title}</h4>
              <button 
                onClick={() => deleteNote(note.id)}
                className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
              {note.content}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
