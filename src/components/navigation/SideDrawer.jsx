import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Settings, BookOpen, History, Bookmark, Headphones, User, Globe, Volume2, Shield, Info } from 'lucide-react'
import { useAppStore } from '../../app/stores.js'
import ModeToggle from '../common/ModeToggle.jsx'

const DRAWER_ITEMS = [
  { id: 'settings', label: 'सेटिंग्स', icon: Settings, path: '/settings' },
  { id: 'profile', label: 'प्रोफ़ाइल', icon: User, path: '/profile' },
  { id: 'language', label: 'भाषा सेटिंग्स', icon: Globe, path: '/settings' },
  { id: 'voice', label: 'आवाज़ सेटिंग्स', icon: Volume2, path: '/settings' },
  { id: 'history', label: 'चैट इतिहास', icon: History, path: '/history' },
  { id: 'saved', label: 'सहेजे गए उत्तर', icon: Bookmark, path: '/saved' },
  { id: 'privacy', label: 'प्राइवेसी', icon: Shield, path: '/settings' },
  { id: 'about', label: 'परिचय', icon: Info, path: '/settings' },
]

export default function SideDrawer({ isOpen, onClose }) {
  const navigate = useNavigate()
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', damping: 25, stiffness: 300 }} className="fixed left-0 top-0 bottom-0 z-50 w-[85%] max-w-sm bg-prakriti-surface border-r border-prakriti-border overflow-y-auto scrollbar-hide">
            
            {/* Temple Silhouette Art on Right */}
            <svg className="absolute right-0 top-1/4 opacity-10 pointer-events-none" width="200" height="400" viewBox="0 0 200 400" fill="none">
              <path d="M100 20 L110 60 L120 100 L130 140 L140 180 L150 220 L160 260 L170 300 L180 340 L20 340 L30 300 L40 260 L50 220 L60 180 L70 140 L80 100 L90 60 Z" stroke="#E8B94A" strokeWidth="1" fill="none" />
              <rect x="40" y="340" width="120" height="40" stroke="#E8B94A" strokeWidth="1" fill="none" />
            </svg>

            {/* Header */}
            <div className="relative p-5 border-b border-prakriti-border flex items-center justify-between">
              <h2 className="text-xl font-bold tracking-wider text-prakriti-white">PRAKRITI <span className="text-gradient-pink-gold text-sm">AI</span></h2>
              <div className="flex items-center gap-4">
                <ModeToggle />
                <button onClick={onClose} className="p-2"><X size={20} className="text-prakriti-muted" /></button>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-3 relative z-10">
              {DRAWER_ITEMS.map((item) => (
                <button key={item.id} onClick={() => { navigate(item.path); onClose() }} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-prakriti-card text-left group">
                  <item.icon size={20} className="text-prakriti-muted group-hover:text-prakriti-pink" />
                  <span className="text-sm font-hindi text-prakriti-white group-hover:text-prakriti-pink">{item.label}</span>
                </button>
              ))}
            </div>

            {/* 27x7 Support Button at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-prakriti-border">
              <button onClick={() => { navigate('/support'); onClose() }} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl neon-pink-border bg-prakriti-card text-prakriti-pink font-hindi text-sm">
                <Headphones size={18} />
                27x7 सहायता
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}