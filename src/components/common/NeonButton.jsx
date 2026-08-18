import React from 'react'
import { motion } from 'framer-motion'
const VARIANTS = {
  pink: { background: 'linear-gradient(135deg, #FF3B9D, #FF4FA8)', boxShadow: '0 0 20px rgba(255,59,157,0.3)', color: '#FFFFFF', border: '1px solid rgba(255,59,157,0.5)' },
  green: { background: 'linear-gradient(135deg, #55E88A, #72FF9B)', boxShadow: '0 0 20px rgba(85,232,138,0.3)', color: '#050609', border: '1px solid rgba(85,232,138,0.5)' },
  gold: { background: 'linear-gradient(135deg, #E8B94A, #FFD76A)', boxShadow: '0 0 20px rgba(232,185,74,0.3)', color: '#050609', border: '1px solid rgba(232,185,74,0.5)' },
  ghost: { background: 'rgba(13,15,18,0.5)', boxShadow: 'none', color: '#F4F1F4', border: '1px solid rgba(255,255,255,0.08)' },
}
export default function NeonButton({ children, onClick, variant = 'pink', size = 'md', className = '', icon: Icon, fullWidth = false, disabled = false, type = 'button' }) {
  const v = VARIANTS[variant] || VARIANTS.pink
  const s = { sm: { padding: '8px 16px', fontSize: '13px' }, md: { padding: '12px 24px', fontSize: '14px' }, lg: { padding: '16px 32px', fontSize: '16px' } }[size]
  return (
    <motion.button type={type} onClick={onClick} disabled={disabled} whileTap={{ scale: 0.98 }} className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium font-hindi ${className}`} style={{ ...v, ...s, width: fullWidth ? '100%' : 'auto', opacity: disabled ? 0.5 : 1 }}>
      {Icon && <Icon size={size === 'sm' ? 16 : 18} />}
      {children}
    </motion.button>
  )
}