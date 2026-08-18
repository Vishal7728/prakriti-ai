import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx' // Changed to Hero
import NeonButton from '../components/common/NeonButton.jsx'
import { useAppStore } from '../app/stores.js'
import { Wifi, WifiOff, Globe } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()
  const { completeWelcome, mode, toggleMode, language, setLanguage } = useAppStore()
  const isOnline = mode === 'online'

  return (
    <div className="min-h-screen flex flex-col items-center justify-end px-6 pb-16 pt-20 relative" style={{ zIndex: 1 }}>
      {/* Top Right Controls */}
      <div className="absolute top-6 right-6 flex items-center gap-4">
        <button onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')} className="flex items-center gap-2 px-3 py-1.5 rounded-full neon-green-border bg-prakriti-card">
          <Globe size={14} className="text-prakriti-green" />
          <span className="text-xs font-hindi text-prakriti-green">{language === 'hi' ? 'हिंदी' : 'EN'}</span>
        </button>
        <button onClick={toggleMode} className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: isOnline ? 'rgba(85, 232, 138, 0.4)' : 'rgba(143, 138, 146, 0.3)' }}>
          {isOnline ? <Wifi size={14} className="text-prakriti-green" /> : <WifiOff size={14} className="text-prakriti-muted" />}
          <span className="text-xs font-medium font-hindi" style={{ color: isOnline ? '#55E88A' : '#8F8A92' }}>{isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}</span>
        </button>
      </div>

      {/* Full Hero Image */}
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="flex-1 flex items-center justify-center w-full mb-8">
        <PrakritiHero state="idle" className="w-full max-w-md" />
      </motion.div>

      {/* Title & Text */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mb-3">
        <h1 className="text-3xl font-bold tracking-wider text-prakriti-white mb-1">PRAKRITI <span className="text-gradient-pink-gold">AI</span></h1>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center mb-10">
        <p className="text-base font-hindi text-prakriti-gold mb-1">आपकी साथी, आपकी सहायक, आपकी शक्ति।</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="w-full max-w-xs">
        <NeonButton variant="pink" size="lg" fullWidth onClick={() => { completeWelcome(); navigate('/home') }}>प्रवेश करें</NeonButton>
      </motion.div>
    </div>
  )
}