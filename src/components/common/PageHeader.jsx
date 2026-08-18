import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function PageHeader({ title, subtitle, showBack = true }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-3 mb-6 mt-2">
      {showBack && (
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-prakriti-card border border-prakriti-border hover:border-prakriti-pink active:scale-95 z-10">
          <ArrowLeft size={20} className="text-prakriti-white" />
        </button>
      )}
      <div className="flex-1">
        {title && <h1 className="text-xl font-bold text-prakriti-white font-hindi">{title}</h1>}
        {subtitle && <p className="text-sm text-prakriti-muted font-hindi">{subtitle}</p>}
      </div>
    </div>
  )
}