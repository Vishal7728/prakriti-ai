import React from 'react'

const getThemeStyles = (color) => {
  switch (color) {
    case 'pink':
      return { bg: 'linear-gradient(135deg, rgba(255,59,157,0.15) 0%, rgba(13,15,18,0.8) 100%)', border: '1px solid rgba(255,59,157,0.3)', shadow: '0 4px 20px rgba(255,59,157,0.1)' }
    case 'green':
      return { bg: 'linear-gradient(135deg, rgba(85,232,138,0.15) 0%, rgba(13,15,18,0.8) 100%)', border: '1px solid rgba(85,232,138,0.3)', shadow: '0 4px 20px rgba(85,232,138,0.1)' }
    case 'gold':
      return { bg: 'linear-gradient(135deg, rgba(232,185,74,0.15) 0%, rgba(13,15,18,0.8) 100%)', border: '1px solid rgba(232,185,74,0.3)', shadow: '0 4px 20px rgba(232,185,74,0.1)' }
    default:
      return { bg: 'linear-gradient(135deg, rgba(13,15,18,0.9) 0%, rgba(8,9,13,0.95) 100%)', border: '1px solid rgba(255,255,255,0.08)', shadow: 'none' }
  }
}

export default function GlassCard({ children, className = '', hover = false, onClick, style = {}, color = null }) {
  const styles = getThemeStyles(color)
  return (
    <div 
      onClick={onClick} 
      className={`rounded-2xl p-5 transition-all ${hover ? 'hover:scale-[1.02] active:scale-[0.98]' : ''} ${className}`} 
      style={{ background: styles.bg, border: styles.border, boxShadow: styles.shadow, cursor: onClick ? 'pointer' : 'default', backdropFilter: 'blur(10px)', ...style }}
    >
      {children}
    </div>
  )
}