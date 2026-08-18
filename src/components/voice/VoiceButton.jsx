import React from 'react'
import { motion } from 'framer-motion'
import { Mic, MicOff, Square } from 'lucide-react'

const STATES = {
  idle: {
    bg: 'linear-gradient(135deg, #FF3B9D, #FF4FA8)',
    shadow: '0 0 30px rgba(255,59,157,0.4), 0 8px 25px rgba(255,59,157,0.3)',
    icon: Mic,
    iconColor: '#FFFFFF',
  },
  listening: {
    bg: 'linear-gradient(135deg, #55E88A, #72FF9B)',
    shadow: '0 0 40px rgba(85,232,138,0.5), 0 8px 25px rgba(85,232,138,0.3)',
    icon: Square,
    iconColor: '#050609',
  },
  thinking: {
    bg: 'linear-gradient(135deg, #E8B94A, #FFD76A)',
    shadow: '0 0 30px rgba(232,185,74,0.4), 0 8px 25px rgba(232,185,74,0.3)',
    icon: Mic,
    iconColor: '#050609',
  },
  speaking: {
    bg: 'linear-gradient(135deg, #FF3B9D, #E8B94A)',
    shadow: '0 0 35px rgba(255,59,157,0.5), 0 8px 25px rgba(232,185,74,0.2)',
    icon: Square,
    iconColor: '#FFFFFF',
  },
  error: {
    bg: 'linear-gradient(135deg, #FF4757, #FF6B7A)',
    shadow: '0 0 30px rgba(255,71,87,0.4), 0 8px 25px rgba(255,71,87,0.2)',
    icon: MicOff,
    iconColor: '#FFFFFF',
  },
  disabled: {
    bg: 'rgba(143, 138, 146, 0.2)',
    shadow: 'none',
    icon: MicOff,
    iconColor: '#8F8A92',
  },
}

function VoiceButton({ state = 'idle', onClick, size = 80, disabled = false }) {
  const config = disabled ? STATES.disabled : STATES[state] || STATES.idle
  const Icon = config.icon

  return (
    <div className="relative flex items-center justify-center" style={{ width: size + 30, height: size + 30 }}>
      {state === 'listening' && (
        <>
          <motion.div
            className="absolute rounded-full border-2"
            style={{ borderColor: 'rgba(85, 232, 138, 0.3)', width: size, height: size }}
            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.div
            className="absolute rounded-full border-2"
            style={{ borderColor: 'rgba(85, 232, 138, 0.2)', width: size, height: size }}
            animate={{ scale: [1, 1.8], opacity: [0.3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5, ease: 'easeOut' }}
          />
        </>
      )}

      {state === 'speaking' && (
        <motion.div
          className="absolute rounded-full border-2"
          style={{ borderColor: 'rgba(255, 59, 157, 0.3)', width: size, height: size }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: 0.95 }}
        whileHover={disabled ? {} : { scale: 1.05 }}
        className="relative rounded-full flex items-center justify-center"
        style={{
          width: size,
          height: size,
          background: config.bg,
          boxShadow: config.shadow,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
        aria-label={`Voice button - ${state}`}
      >
        {state === 'thinking' && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: '#050609',
              borderRightColor: '#050609',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        <Icon size={size * 0.35} color={config.iconColor} />
      </motion.button>
    </div>
  )
}

export default VoiceButton