import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Wrench, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '../../app/stores.js'

const NAV_ITEMS = [
  { id: 'home', labelHi: 'होम', labelEn: 'Home', icon: Home, path: '/home' },
  { id: 'gyan', labelHi: 'ज्ञान', labelEn: 'Gyan', icon: BookOpen, path: '/gyan' },
  { id: 'tools', labelHi: 'टूल्स', labelEn: 'Tools', icon: Wrench, path: '/tools' },
  { id: 'profile', labelHi: 'प्रोफ़ाइल', labelEn: 'Profile', icon: User, path: '/profile' },
]

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { language } = useAppStore()
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/')

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 border-t border-prakriti-border"
      style={{ background: 'rgba(5, 6, 9, 0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      {/* Soft pink glow above active tab */}
      <div className="absolute -top-10 left-0 right-0 h-10 pointer-events-none" style={{ background: 'linear-gradient(to top, rgba(255,59,157,0.08), transparent)' }} />
      <div className="max-w-[480px] mx-auto h-full flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full py-2 active:scale-95 transition-transform"
              aria-label={item.labelEn}
            >
              {active && (
                <motion.div
                  layoutId="nav-glow"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-14 h-[3px] rounded-full"
                  style={{ background: 'linear-gradient(90deg, transparent, #FF3B9D, transparent)', boxShadow: '0 0 12px rgba(255,59,157,0.8), 0 0 24px rgba(255,59,157,0.4)' }}
                />
              )}
              <motion.div animate={{ scale: active ? 1.12 : 1, y: active ? -2 : 0 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
                <Icon
                  size={22}
                  className={active ? 'text-prakriti-pink' : 'text-prakriti-muted'}
                  style={active ? { filter: 'drop-shadow(0 0 8px rgba(255,59,157,0.7))' } : undefined}
                />
              </motion.div>
              <span className={`text-[10px] font-semibold font-hindi ${active ? 'text-prakriti-pink' : 'text-prakriti-muted'}`}>
                {language === 'hi' ? item.labelHi : item.labelEn}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
