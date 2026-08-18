import React from 'react'
import { motion } from 'framer-motion'

const LotusIcon = ({ size = 24, color = 'white' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C12 2 10 6 6 8C8 12 12 12 12 12C12 12 16 12 18 8C14 6 12 2 12 2Z" />
    <path d="M2 12C2 12 6 10 10 12C10 12 10 16 6 18C4 16 2 14 2 12Z" />
    <path d="M22 12C22 12 18 10 14 12C14 12 14 16 18 18C20 16 22 14 22 12Z" />
    <path d="M12 22C12 22 10 18 6 16C8 12 12 12 12 12C12 12 16 12 18 16C14 18 12 22 12 22Z" />
  </svg>
)

export default function VoiceButton({ state = 'idle', onClick, size = 80, disabled = false }) {
  const bg = state === 'listening' ? 'linear-gradient(135deg, #55E88A, #72FF9B)' : 'linear-gradient(135deg, #FF3B9D, #E8B94A)'
  const shadow = state === 'listening' ? '0 0 40px rgba(85,232,138,0.5)' : '0 0 30px rgba(255,59,157,0.4)'
  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 30, height: size + 30 }}>
      {state === 'listening' && (
        <motion.div className="absolute rounded-full border-2" style={{ borderColor: 'rgba(85, 232, 138, 0.3)', width: size, height: size }} animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
      )}
      <motion.button onClick={onClick} disabled={disabled} whileTap={{ scale: 0.95 }} className="relative rounded-full flex items-center justify-center" style={{ width: size, height: size, background: bg, boxShadow: shadow }}>
        <LotusIcon size={size * 0.4} color={state === 'listening' ? '#050609' : '#FFFFFF'} />
      </motion.button>
    </div>
  )
}