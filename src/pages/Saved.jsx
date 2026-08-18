import React, { useState, useEffect } from 'react'
import { Bookmark, Trash2 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import { useSavedStore } from '../app/stores.js'

export default function Saved() {
  const { savedAnswers, initialize, deleteSavedAnswer } = useSavedStore()
  useEffect(() => { initialize() }, [initialize])
  const del = (id) => { deleteSavedAnswer(id); const u = savedAnswers.filter((a) => a.id !== id); localStorage.setItem('prakriti-saved-answers', JSON.stringify(u)) }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="सहेजे गए उत्तर" />
      {savedAnswers.length === 0 ? (
        <GlassCard className="p-8 text-center"><Bookmark size={32} className="text-prakriti-muted mx-auto mb-3" /><p className="text-sm font-hindi text-prakriti-muted">अभी कोई उत्तर सहेजा नहीं गया</p></GlassCard>
      ) : (
        <div className="space-y-3">
          {savedAnswers.map((a) => (
            <GlassCard key={a.id} className="p-4">
              <div className="flex items-start justify-between mb-2"><h3 className="text-sm font-hindi text-prakriti-white flex-1">{a.title}</h3><button onClick={() => del(a.id)} className="p-1.5"><Trash2 size={14} className="text-prakriti-red" /></button></div>
              <p className="text-xs font-hindi text-prakriti-muted">{a.question}</p>
              <div className="mt-3 p-3 rounded-xl bg-prakriti-bg border border-prakriti-border"><p className="text-sm font-hindi text-prakriti-white whitespace-pre-wrap">{a.answer}</p></div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}