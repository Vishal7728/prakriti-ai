import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx'
import NeonButton from '../components/common/NeonButton.jsx'
import { useAppStore } from '../app/stores.js'
import { Wifi, WifiOff, Globe, Sparkles } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()
  const { completeWelcome, mode, toggleMode, language, setLanguage } = useAppStore()
  const isOnline = mode === 'online'

  return (
    <div className="min-h-screen min-h-dvh flex flex-col items-center justify-end px-6 pb-14 pt-16 relative" style={{ zIndex: 1 }}>
      {/* Top Right Controls */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="absolute top-6 right-5 flex items-center gap-3">
        <button
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full neon-green-border bg-prakriti-card/80 backdrop-blur-md active:scale-95 transition-transform"
        >
          <Globe size={14} className="text-prakriti-green" />
          <span className="text-xs font-semibold font-hindi text-prakriti-green">{language === 'hi' ? 'हिंदी' : 'EN'}</span>
        </button>
        <button
          onClick={toggleMode}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border bg-prakriti-card/80 backdrop-blur-md active:scale-95 transition-transform"
          style={{ borderColor: isOnline ? 'rgba(85, 232, 138, 0.4)' : 'rgba(143, 138, 146, 0.3)' }}
        >
          {isOnline ? <Wifi size={14} className="text-prakriti-green" /> : <WifiOff size={14} className="text-prakriti-muted" />}
          <span className="text-xs font-semibold font-hindi" style={{ color: isOnline ? '#55E88A' : '#8F8A92' }}>{isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}</span>
        </button>
      </motion.div>

      {/* Glow behind hero */}
      <div className="absolute left-1/2 top-[30%] -translate-x-1/2 w-[80%] max-w-sm h-[45%] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,59,157,0.18) 0%, rgba(112,0,255,0.08) 45%, transparent 70%)', filter: 'blur(30px)' }} />

      {/* Full Hero Image */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex-1 flex items-center justify-center w-full mb-6">
        <PrakritiHero state="idle" className="w-full max-w-md" />
      </motion.div>

      {/* Title & Text */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center mb-3">
        <h1 className="text-3xl font-bold tracking-[0.2em] text-prakriti-white mb-2">
          PRAKRITI <span className="text-gradient-pink-gold">AI</span>
        </h1>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, transparent, #E8B94A)' }} />
          <Sparkles size={12} className="text-prakriti-gold" />
          <span className="h-px w-8" style={{ background: 'linear-gradient(90deg, #E8B94A, transparent)' }} />
        </div>
      </motion.div>

      <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="text-center text-base font-hindi text-prakriti-gold mb-10">
        आपकी साथी, आपकी सहायक, आपकी शक्ति।
      </motion.p>

      {/* Entry Button */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.5 }} className="w-full max-w-xs">
        <NeonButton variant="pink" size="lg" fullWidth onClick={() => { completeWelcome(); navigate('/home') }}>
          प्रवेश करें
        </NeonButton>
        <p className="text-center text-[11px] font-hindi text-prakriti-muted mt-4">भारत की पहली हिंदी AI साथी</p>
      </motion.div>
    </div>
  )
}
