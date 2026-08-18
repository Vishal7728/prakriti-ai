import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'

// Replaced expired CDN link with a permanent, reliable placeholder
const IMAGE_URL = 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop'
const STATES = {
  idle: '#FF3B9D', listening: '#55E88A', thinking: '#E8B94A', speaking: '#FF3B9D', error: '#FF4757', offline: '#8F8A92'
}

function PrakritiAvatar({ size = 'lg', state = 'idle', showHalo = true, className = '' }) {
  const px = typeof size === 'number' ? size : 240
  const color = STATES[state] || STATES.idle
  const [imgError, setImgError] = useState(false)

  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: px, height: px }}>
      {showHalo && (
        <motion.div 
          className="absolute rounded-full" 
          style={{ 
            width: px * 0.9, 
            height: px * 0.9, 
            background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`, 
            filter: 'blur(25px)' 
          }} 
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.6, 0.4] }} 
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} 
        />
      )}
      
      <motion.div 
        className="relative rounded-full overflow-hidden flex items-center justify-center bg-prakriti-card"
        style={{ width: px * 0.75, height: px * 0.75, boxShadow: `0 0 25px ${color}60`, border: `2px solid ${color}80` }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {imgError ? (
          <div className="w-full h-full flex items-center justify-center text-prakriti-pink">
            {/* Fallback Icon */}
            <svg width="50%" height="50%" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C12 2 10 6 6 8C8 12 12 12 12 12C12 12 16 12 18 8C14 6 12 2 12 2Z M2 12C2 12 6 10 10 12C10 12 10 16 6 18C4 16 2 14 2 12Z M22 12C22 12 18 10 14 12C14 12 14 16 18 18C20 16 22 14 22 12Z M12 22C12 22 10 18 6 16C8 12 12 12 12 12C12 12 16 12 18 16C14 18 12 22 12 22Z" />
            </svg>
          </div>
        ) : (
          <img 
            src={IMAGE_URL} 
            alt="Prakriti AI" 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        )}
      </motion.div>
    </div>
  )
}

export default memo(PrakritiAvatar)