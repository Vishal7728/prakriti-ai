import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Globe, Palette, Volume2, Shield, Settings, ChevronRight, Bookmark, Clock } from 'lucide-react'
import PrakritiAvatar from '../components/avatar/PrakritiAvatar.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { useAppStore } from '../app/stores.js'
import { Wifi, WifiOff } from 'lucide-react'

const ITEMS = [
  { id: 'name', label: 'खाता', icon: User, path: '/settings' },
  { id: 'language', label: 'भाषा', icon: Globe, path: '/settings' },
  { id: 'theme', label: 'थीम', icon: Palette, path: '/settings' },
  { id: 'voice', label: 'आवाज़', icon: Volume2, path: '/settings' },
  { id: 'privacy', label: 'प्राइवेसी', icon: Shield, path: '/settings' },
  { id: 'settings', label: 'सेटिंग्स', icon: Settings, path: '/settings' },
  { id: 'saved', label: 'सहेजे गए', icon: Bookmark, path: '/saved' },
  { id: 'history', label: 'इतिहास', icon: Clock, path: '/history' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { mode } = useAppStore()
  const isOnline = mode === 'online'

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="अपना प्रोफाइल" />
      
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <GlassCard className="p-6 flex flex-col items-center text-center">
          <PrakritiAvatar size="lg" state="idle" className="mb-4" />
          <h2 className="text-lg font-bold font-hindi text-prakriti-white mb-1">अपना प्रोफाइल</h2>
          <p className="text-sm font-hindi text-prakriti-muted mb-4">ज्ञान की यात्रा में आपका स्वागत है।</p>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: isOnline ? 'rgba(85, 232, 138, 0.4)' : 'rgba(143, 138, 146, 0.3)' }}>
            {isOnline ? <Wifi size={14} className="text-prakriti-green" /> : <WifiOff size={14} className="text-prakriti-muted" />}
            <span className="text-xs font-hindi" style={{ color: isOnline ? '#55E88A' : '#8F8A92' }}>{isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}</span>
          </div>
        </GlassCard>
      </motion.div>

      <div className="space-y-2">
        {ITEMS.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard hover className="p-4 flex items-center justify-between" onClick={() => navigate(item.path)}>
              <div className="flex items-center gap-3">
                <item.icon size={20} className="text-prakriti-muted" />
                <span className="text-sm font-hindi text-prakriti-white">{item.label}</span>
              </div>
              <ChevronRight size={18} className="text-prakriti-muted" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}