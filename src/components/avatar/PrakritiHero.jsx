import React, { memo, useState } from 'react'
import { motion } from 'framer-motion'

// Uses the image from your public folder
const LOCAL_IMAGE = '/prakriti-hero.png' 

function PrakritiHero({ state = 'idle', className = '', style = {} }) {
  const [imgError, setImgError] = useState(false)

  return (
    <motion.div 
      className={`relative flex items-center justify-center ${className}`} 
      style={style}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      {imgError ? (
        <div className="w-full h-full flex items-center justify-center text-prakriti-pink p-8 text-center border border-dashed border-prakriti-border rounded-xl">
          <p className="text-sm font-hindi">
            Image not found!<br/>
            Please save the girl's image as <br/><strong>prakriti-hero.png</strong> <br/>inside the <strong>public</strong> folder.
          </p>
        </div>
      ) : (
        <img 
          src={LOCAL_IMAGE} 
          alt="Prakriti AI" 
          className="w-full h-auto object-contain max-h-[70vh]"
          onError={() => setImgError(true)}
        />
      )}
    </motion.div>
  )
}

export default memo(PrakritiHero)