import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx' // Changed to Hero
import GlassCard from '../components/common/GlassCard.jsx'
import NeonButton from '../components/common/NeonButton.jsx'

export default function Home() {
  const navigate = useNavigate()
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('prakriti-search-history')
    if (saved) {
      try { setHistory(JSON.parse(saved)) } catch (e) {}
    }
  }, [])

  return (
    <div className="page-container px-5 pt-4 flex flex-col" style={{ zIndex: 1, minHeight: 'calc(100vh - 64px)' }}>
      {/* Full Hero Image instead of circle */}
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-center mb-6 mt-4">
        <PrakritiHero state="idle" className="w-full max-w-sm" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h2 className="text-xl font-hindi text-prakriti-white mb-1">प्रकृति, आपका पात्र है</h2>
        <p className="text-sm font-hindi text-prakriti-muted">आपकी साथी, आपकी शक्ति।</p>
      </motion.div>

      {/* Clean CTA Button */}
      <div className="px-4 mb-10">
        <NeonButton variant="pink" size="lg" fullWidth icon={MessageCircle} onClick={() => navigate('/speak')}>
          प्रकृति से बात करें
        </NeonButton>
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-hindi text-prakriti-white">श्रेणी में सवाल</h3>
          {history.length > 0 && <button onClick={() => navigate('/history')} className="text-xs font-hindi text-prakriti-pink flex items-center gap-1">सभी देखें <ArrowRight size={12} /></button>}
        </div>
        <div className="space-y-2">
          {history.length > 0 ? history.slice(0, 4).map((h) => (
            <GlassCard key={h.id} hover className="p-3 flex items-center justify-between" onClick={() => navigate('/speak', { state: { query: h.query } })}>
              <p className="text-sm font-hindi text-prakriti-white truncate flex-1">{h.query}</p>
            </GlassCard>
          )) : (
            <GlassCard className="p-6 text-center">
              <p className="text-sm font-hindi text-prakriti-muted">अभी कोई सवाल नहीं है। प्रकृति से पूछें।</p>
            </GlassCard>
          )}
        </div>
      </motion.div>
    </div>
  )
}