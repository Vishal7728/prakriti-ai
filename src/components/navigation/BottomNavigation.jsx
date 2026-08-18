import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, BookOpen, Wrench, User } from 'lucide-react'
import { motion } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'home', label: 'होम', icon: Home, path: '/home' },
  { id: 'gyan', label: 'ज्ञान', icon: BookOpen, path: '/gyan' },
  { id: 'tools', label: 'टूल्स', icon: Wrench, path: '/tools' },
  { id: 'profile', label: 'प्रोफ़ाइल', icon: User, path: '/profile' },
]

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = (path) => location.pathname.startsWith(path)
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-prakriti-bg/90 backdrop-blur-xl border-t border-prakriti-border">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path)
          const Icon = item.icon
          return (
            <button key={item.id} onClick={() => navigate(item.path)} className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full py-2">
              {active && <motion.div layoutId="nav-glow" className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-0.5 rounded-full" style={{ background: 'linear-gradient(90deg, transparent, #FF3B9D, transparent)', boxShadow: '0 0 10px rgba(255,59,157,0.6)' }} />}
              <motion.div animate={{ scale: active ? 1.1 : 1, y: active ? -1 : 0 }}><Icon size={22} className={active ? 'text-prakriti-pink' : 'text-prakriti-muted'} /></motion.div>
              <span className={`text-[10px] font-hindi ${active ? 'text-prakriti-pink' : 'text-prakriti-muted'}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}