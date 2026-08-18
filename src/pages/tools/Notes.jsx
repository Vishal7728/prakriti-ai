import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, X } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'
import { useNotesStore } from '../../app/stores.js'

export default function Notes() {
  const { notes, addNote, deleteNote, initialize } = useNotesStore()
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  useEffect(() => { initialize() }, [initialize])
  useEffect(() => { localStorage.setItem('prakriti-notes', JSON.stringify(notes)) }, [notes])
  const save = () => { if (title.trim() || content.trim()) { addNote({ id: Date.now(), title: title || 'बिना शीर्षक', content, createdAt: Date.now() }) }; setTitle(''); setContent(''); setShow(false) }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="नोट्स" />
      <NeonButton variant="green" size="md" fullWidth icon={Plus} onClick={() => setShow(true)} className="mb-4">नया नोट बनाएं</NeonButton>
      {notes.length === 0 ? (
        <GlassCard className="p-8 text-center"><p className="text-sm font-hindi text-prakriti-muted">अभी कोई नोट नहीं है</p></GlassCard>
      ) : (
        <div className="space-y-3">
          {notes.map((n) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-4">
                <div className="flex items-start justify-between mb-2"><h3 className="text-sm font-hindi text-prakriti-white flex-1">{n.title}</h3><button onClick={() => deleteNote(n.id)} className="p-1.5"><Trash2 size={14} className="text-prakriti-red" /></button></div>
                <p className="text-xs font-hindi text-prakriti-muted line-clamp-2">{n.content}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      )}
      <AnimatePresence>
        {show && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShow(false)} className="fixed inset-0 z-50 bg-black/60" />
            <motion.div initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} className="fixed bottom-0 left-0 right-0 z-50 bg-prakriti-surface border-t border-prakriti-border rounded-t-3xl p-5">
              <div className="flex justify-between mb-4"><h3 className="text-base font-hindi text-prakriti-white">नया नोट</h3><button onClick={() => setShow(false)}><X size={20} className="text-prakriti-muted" /></button></div>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="शीर्षक..." className="w-full p-3 rounded-xl bg-prakriti-card border border-prakriti-border text-sm text-prakriti-white mb-3" autoFocus />
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="यहाँ लिखें..." rows={6} className="w-full p-3 rounded-xl bg-prakriti-card border border-prakriti-border text-sm text-prakriti-white mb-4 resize-none" />
              <NeonButton variant="green" size="md" fullWidth onClick={save}>सहेजें</NeonButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}