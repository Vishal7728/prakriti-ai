import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Globe, Palette, Volume2, Shield, Settings, ChevronRight, Bookmark, Clock, Wifi, WifiOff, Sparkles } from 'lucide-react'
import PrakritiAvatar from '../components/avatar/PrakritiAvatar.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { useAppStore } from '../app/stores.js'

const ITEMS = [
  { id: 'name', labelHi: 'खाता', labelEn: 'Account', icon: User, path: '/settings', color: '#FF3B9D' },
  { id: 'language', labelHi: 'भाषा', labelEn: 'Language', icon: Globe, path: '/settings', color: '#55E88A' },
  { id: 'theme', labelHi: 'थीम', labelEn: 'Theme', icon: Palette, path: '/settings', color: '#E8B94A' },
  { id: 'voice', labelHi: 'आवाज़', labelEn: 'Voice', icon: Volume2, path: '/settings', color: '#FF3B9D' },
  { id: 'saved', labelHi: 'सहेजे गए', labelEn: 'Saved', icon: Bookmark, path: '/saved', color: '#55E88A' },
  { id: 'history', labelHi: 'इतिहास', labelEn: 'History', icon: Clock, path: '/history', color: '#E8B94A' },
  { id: 'privacy', labelHi: 'प्राइवेसी', labelEn: 'Privacy', icon: Shield, path: '/settings', color: '#FF3B9D' },
  { id: 'settings', labelHi: 'सेटिंग्स', labelEn: 'Settings', icon: Settings, path: '/settings', color: '#55E88A' },
]

export default function Profile() {
  const navigate = useNavigate()
  const { mode, language } = useAppStore()
  const isOnline = mode === 'online'

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader
        title={language === 'hi' ? 'प्रोफ़ाइल' : 'Profile'}
        subtitle={language === 'hi' ? 'आपकी जानकारी और प्राथमिकताएँ' : 'Your info and preferences'}
      />

      {/* Profile Card */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <GlassCard className="p-6 flex flex-col items-center text-center">
          <PrakritiAvatar size="lg" state="idle" className="mb-4" />
          <h2 className="text-lg font-bold font-hindi text-prakriti-white mb-1">
            {language === 'hi' ? 'अतिथि उपयोगकर्ता' : 'Guest User'}
          </h2>
          <p className="text-sm font-hindi text-prakriti-muted mb-4 flex items-center gap-1.5">
            <Sparkles size={13} className="text-prakriti-gold" />
            {language === 'hi' ? 'ज्ञान की यात्रा में आपका स्वागत है।' : 'Welcome to your knowledge journey.'}
          </p>
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full border"
            style={{
              borderColor: isOnline ? 'rgba(85, 232, 138, 0.4)' : 'rgba(143, 138, 146, 0.3)',
              background: isOnline ? 'rgba(85, 232, 138, 0.08)' : 'rgba(13, 15, 18, 0.5)',
            }}
          >
            {isOnline ? <Wifi size={14} className="text-prakriti-green" /> : <WifiOff size={14} className="text-prakriti-muted" />}
            <span className="text-xs font-semibold font-hindi" style={{ color: isOnline ? '#55E88A' : '#8F8A92' }}>
              {isOnline ? (language === 'hi' ? 'ऑनलाइन' : 'Online') : (language === 'hi' ? 'ऑफलाइन' : 'Offline')}
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Menu List */}
      <div className="space-y-2.5">
        {ITEMS.map((item, i) => (
          <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard hover className="p-4 flex items-center justify-between" onClick={() => navigate(item.path)}>
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded-xl" style={{ backgroundColor: `${item.color}18`, border: `1px solid ${item.color}35` }}>
                  <item.icon size={18} style={{ color: item.color }} />
                </div>
                <span className="text-sm font-hindi text-prakriti-white">{language === 'hi' ? item.labelHi : item.labelEn}</span>
              </div>
              <ChevronRight size={18} className="text-prakriti-muted" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
