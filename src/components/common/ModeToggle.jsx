import React from 'react'
import { Wifi, WifiOff } from 'lucide-react'
import { useAppStore } from '../../app/stores.js'

export default function ModeToggle() {
  const { mode, toggleMode } = useAppStore()
  const isOnline = mode === 'online'
  return (
    <button onClick={toggleMode} className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border" style={{ borderColor: isOnline ? 'rgba(85, 232, 138, 0.4)' : 'rgba(143, 138, 146, 0.3)', background: isOnline ? 'rgba(85, 232, 138, 0.1)' : 'rgba(13, 15, 18, 0.5)' }}>
      {isOnline ? <Wifi size={14} className="text-prakriti-green" /> : <WifiOff size={14} className="text-prakriti-muted" />}
      <span className="text-xs font-medium font-hindi" style={{ color: isOnline ? '#55E88A' : '#8F8A92' }}>{isOnline ? 'ऑनलाइन' : 'ऑफलाइन'}</span>
    </button>
  )
}