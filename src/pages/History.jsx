import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import { formatTime } from '../utils/helpers.js'

export default function History() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])
  useEffect(() => { const s = localStorage.getItem('prakriti-search-history'); if (s) { try { setHistory(JSON.parse(s)) } catch (e) {} } }, [])
  const clear = () => { localStorage.removeItem('prakriti-search-history'); setHistory([]) }
  const del = (id) => { const u = history.filter((h) => h.id !== id); setHistory(u); localStorage.setItem('prakriti-search-history', JSON.stringify(u)) }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="चैट इतिहास" subtitle="आपकी पिछली खोजें" />
      {history.length === 0 ? (
        <GlassCard className="p-8 text-center"><p className="text-sm font-hindi text-prakriti-muted">अभी कोई इतिहास नहीं है</p></GlassCard>
      ) : (
        <>
          <button onClick={clear} className="flex items-center gap-2 text-xs font-hindi text-prakriti-red mb-4"><Trash2 size={14} /> सभी हटाएं</button>
          <div className="space-y-2">
            {history.map((h) => (
              <GlassCard key={h.id} hover className="p-3 flex items-center justify-between">
                <div className="flex-1" onClick={() => navigate('/speak', { state: { query: h.query } })}>
                  <p className="text-sm font-hindi text-prakriti-white mb-1">{h.query}</p>
                  <span className="text-xs text-prakriti-muted">{formatTime(h.timestamp)}</span>
                </div>
                <button onClick={() => del(h.id)} className="p-2"><Trash2 size={16} className="text-prakriti-muted" /></button>
              </GlassCard>
            ))}
          </div>
        </>
      )}
    </div>
  )
}