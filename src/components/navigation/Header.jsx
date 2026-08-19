import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu } from 'lucide-react'
import ModeToggle from '../common/ModeToggle.jsx'
import { useAppStore } from '../../app/stores.js'

export default function Header() {
  const navigate = useNavigate()
  const { toggleDrawer } = useAppStore()
  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-prakriti-border"
      style={{ background: 'rgba(5, 6, 9, 0.85)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
    >
      <div className="max-w-[480px] mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={toggleDrawer} className="p-2 rounded-xl bg-prakriti-card border border-prakriti-border active:scale-90 transition-transform" aria-label="Menu">
            <Menu size={20} className="text-prakriti-white" />
          </button>
          <button onClick={() => navigate('/home')} className="active:scale-95 transition-transform">
            <span className="text-base font-bold tracking-[0.15em] text-prakriti-white">
              PRAKRITI <span className="text-gradient-pink-gold text-xs">AI</span>
            </span>
          </button>
        </div>
        <ModeToggle />
      </div>
    </header>
  )
}
