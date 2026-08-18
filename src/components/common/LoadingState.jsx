import React from 'react'
import { motion } from 'framer-motion'
import PrakritiAvatar from '../avatar/PrakritiAvatar.jsx'

function LoadingState({ message = 'प्रकृति सोच रही है...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <PrakritiAvatar size="md" state="thinking" />
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-sm text-prakriti-muted font-hindi"
      >
        {message}
      </motion.p>
    </div>
  )
}

export default LoadingState