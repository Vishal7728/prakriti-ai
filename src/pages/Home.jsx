import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle, Clock3 } from 'lucide-react'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import NeonButton from '../components/common/NeonButton.jsx'
import { useAppStore } from '../app/stores.js'

export default function Home() {
  const navigate = useNavigate()
  const { language } = useAppStore()
  const [history, setHistory] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem('prakriti-search-history')
    if (saved) {
      try { setHistory(JSON.parse(saved)) } catch (e) { setHistory([]) }
    }
  }, [])

  const greeting = language === 'hi' ? 'नमस्ते 🙏' : 'Namaste 🙏'
  const intro = language === 'hi' ? 'मैं प्रकृति हूँ — आपकी अपनी AI साथी।' : 'I am Prakriti — your own AI companion.'
  const ctaLabel = language === 'hi' ? 'प्रकृति से बात करें' : 'Talk to Prakriti'
  const sectionTitle = language === 'hi' ? 'हाल के सवाल' : 'Recent Questions'
  const emptyText = language === 'hi' ? 'अभी कोई सवाल नहीं है। प्रकृति से पूछें।' : 'No questions yet. Ask Prakriti.'

  return (
    <div className="page-container px-5 pt-4 flex flex-col" style={{ zIndex: 1, minHeight: 'calc(100vh - 144px)' }}>
      {/* Hero Image */}
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="flex justify-center mb-4 mt-2">
        <PrakritiHero state="idle" className="w-full max-w-[300px]" />
      </motion.div>

      {/* Greeting */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="text-center mb-6">
        <h2 className="text-2xl font-bold font-hindi text-prakriti-white mb-1">{greeting}</h2>
        <p className="text-sm font-hindi text-prakriti-muted">{intro}</p>
      </motion.div>

      {/* CTA Button */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="px-2 mb-8">
        <NeonButton variant="pink" size="lg" fullWidth icon={MessageCircle} onClick={() => navigate('/speak')}>
          {ctaLabel}
        </NeonButton>
      </motion.div>

      {/* Recent Questions */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="flex-1">
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-sm font-semibold font-hindi text-prakriti-white flex items-center gap-2">
            <Clock3 size={14} className="text-prakriti-pink" />
            {sectionTitle}
          </h3>
          {history.length > 0 && (
            <button onClick={() => navigate('/history')} className="text-xs font-hindi text-prakriti-pink flex items-center gap-1 active:scale-95 transition-transform">
              {language === 'hi' ? 'सभी देखें' : 'View all'} <ArrowRight size={12} />
            </button>
          )}
        </div>
        <div className="space-y-2.5">
          {history.length > 0 ? history.slice(0, 4).map((h, i) => (
            <motion.div key={h.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.06 }}>
              <GlassCard hover className="p-3.5 flex items-center justify-between" onClick={() => navigate('/speak', { state: { query: h.query } })}>
                <p className="text-sm font-hindi text-prakriti-white truncate flex-1">{h.query}</p>
                <ArrowRight size={16} className="text-prakriti-muted shrink-0" />
              </GlassCard>
            </motion.div>
          )) : (
            <GlassCard className="p-6 text-center">
              <p className="text-sm font-hindi text-prakriti-muted">{emptyText}</p>
            </GlassCard>
          )}
        </div>
      </motion.div>
    </div>
  )
}
