import React from 'react'

export default function IndianMotifBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0, backgroundColor: '#050609' }}>
      
      {/* Base Magenta & Purple Glow */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 80%, rgba(255, 0, 100, 0.2) 0%, transparent 60%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(112, 0, 255, 0.12) 0%, transparent 50%)' }} />

      {/* 3D Rajasthani Architecture - Right Side */}
      <svg className="absolute right-0 top-0 h-full w-1/2 opacity-40 pointer-events-none" viewBox="0 0 400 800" fill="none" preserveAspectRatio="xMaxYMid slice">
        <defs>
          <linearGradient id="arch-grad-r" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E8B94A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FF3B9D" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Main Temple Structure */}
        <path d="M200 50 L220 150 L240 250 L260 350 L280 450 L300 550 L320 650 L340 750 L60 750 L80 650 L100 550 L120 450 L140 350 L160 250 L180 150 Z" stroke="url(#arch-grad-r)" strokeWidth="2" fill="rgba(13,15,18,0.4)" />
        {/* Jharokha (Window) Details */}
        <path d="M150 550 Q200 500 250 550 L250 650 Q200 600 150 650 Z" stroke="url(#arch-grad-r)" strokeWidth="1.5" fill="none" />
        <path d="M170 450 Q200 420 230 450 L230 550 Q200 520 170 550 Z" stroke="url(#arch-grad-r)" strokeWidth="1.5" fill="none" />
        {/* Pillars */}
        <line x1="100" y1="350" x2="100" y2="750" stroke="url(#arch-grad-r)" strokeWidth="1.5" />
        <line x1="300" y1="350" x2="300" y2="750" stroke="url(#arch-grad-r)" strokeWidth="1.5" />
        {/* Arch Tops */}
        <path d="M120 450 Q200 380 280 450" stroke="url(#arch-grad-r)" strokeWidth="2" fill="none" />
        <path d="M140 350 Q200 300 260 350" stroke="url(#arch-grad-r)" strokeWidth="2" fill="none" />
      </svg>

      {/* 3D Rajasthani Architecture - Left Side (Mirrored) */}
      <svg className="absolute left-0 top-0 h-full w-1/2 opacity-40 pointer-events-none" viewBox="0 0 400 800" fill="none" preserveAspectRatio="xMinYMid slice">
        <defs>
          <linearGradient id="arch-grad-l" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#55E88A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#7000FF" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {/* Main Temple Structure */}
        <path d="M200 50 L220 150 L240 250 L260 350 L280 450 L300 550 L320 650 L340 750 L60 750 L80 650 L100 550 L120 450 L140 350 L160 250 L180 150 Z" stroke="url(#arch-grad-l)" strokeWidth="2" fill="rgba(13,15,18,0.4)" />
        {/* Jharokha (Window) Details */}
        <path d="M150 550 Q200 500 250 550 L250 650 Q200 600 150 650 Z" stroke="url(#arch-grad-l)" strokeWidth="1.5" fill="none" />
        <path d="M170 450 Q200 420 230 450 L230 550 Q200 520 170 550 Z" stroke="url(#arch-grad-l)" strokeWidth="1.5" fill="none" />
        {/* Pillars */}
        <line x1="100" y1="350" x2="100" y2="750" stroke="url(#arch-grad-l)" strokeWidth="1.5" />
        <line x1="300" y1="350" x2="300" y2="750" stroke="url(#arch-grad-l)" strokeWidth="1.5" />
        {/* Arch Tops */}
        <path d="M120 450 Q200 380 280 450" stroke="url(#arch-grad-l)" strokeWidth="2" fill="none" />
        <path d="M140 350 Q200 300 260 350" stroke="url(#arch-grad-l)" strokeWidth="2" fill="none" />
      </svg>

      {/* Dark Overlay for Readability */}
      <div className="absolute inset-0 bg-prakriti-bg/70" style={{ mixBlendMode: 'multiply' }} />
    </div>
  )
}