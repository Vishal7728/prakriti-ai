import React, { memo } from 'react'
import { motion } from 'framer-motion'

function Waveform({ active = false, bars = 28, color = '#FF3B9D', height = 40 }) {
  return (
    <div className="flex items-center justify-center gap-1" style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          style={{
            width: 3,
            background: color,
            opacity: active ? 1 : 0.3,
          }}
          animate={
            active
              ? {
                  height: [
                    `${20 + Math.random() * 30}%`,
                    `${50 + Math.random() * 50}%`,
                    `${20 + Math.random() * 30}%`,
                  ],
                }
              : { height: '20%' }
          }
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            delay: i * 0.03,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default memo(Waveform)