import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Heart, Atom, Cpu, Activity, ChevronRight, X } from 'lucide-react'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { gyanCategories } from '../data/gyan.js'
import { useAppStore } from '../app/stores.js'

const CATEGORY_META = {
  medical: { icon: Heart, color: 'pink' },
  science: { icon: Atom, color: 'green' },
  technology: { icon: Cpu, color: 'gold' },
  yoga: { icon: Activity, color: 'pink' },
}

const COLOR_MAP = {
  pink: { text: '#FF3B9D', bg: 'rgba(255,59,157,0.12)', border: 'rgba(255,59,157,0.35)', glow: '0 0 18px rgba(255,59,157,0.15)' },
  green: { text: '#55E88A', bg: 'rgba(85,232,138,0.12)', border: 'rgba(85,232,138,0.35)', glow: '0 0 18px rgba(85,232,138,0.15)' },
  gold: { text: '#E8B94A', bg: 'rgba(232,185,74,0.12)', border: 'rgba(232,185,74,0.35)', glow: '0 0 18px rgba(232,185,74,0.15)' },
}

export default function Gyan() {
  const navigate = useNavigate()
  const { language } = useAppStore()
  const [search, setSearch] = useState('')

  const q = search.trim().toLowerCase()
  const categories = q
    ? gyanCategories.filter((c) =>
        c.titleHi.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.topics.some((t) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
      )
    : gyanCategories

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader
        title={language === 'hi' ? 'ज्ञान' : 'Gyan'}
        subtitle={language === 'hi' ? 'ज्ञान का भंडार — सीखें, समझें, आगे बढ़ें' : 'Knowledge library — learn, understand, grow'}
      />

      {/* Search Pill */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-prakriti-muted" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={language === 'hi' ? 'विषय खोजें...' : 'Search topics...'}
          className="w-full pl-12 pr-11 py-3.5 rounded-full bg-prakriti-card border border-prakriti-border text-sm font-hindi text-prakriti-white placeholder-prakriti-muted focus:border-prakriti-pink transition-colors"
          style={{ boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)' }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full bg-prakriti-card-hover active:scale-90 transition-transform">
            <X size={14} className="text-prakriti-muted" />
          </button>
        )}
      </motion.div>

      {/* Category Cards */}
      <div className="space-y-4">
        {categories.length > 0 ? categories.map((cat, i) => {
          const meta = CATEGORY_META[cat.id] || CATEGORY_META.science
          const Icon = meta.icon
          const c = COLOR_MAP[meta.color]
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <GlassCard hover className="p-5 flex items-center gap-4" onClick={() => navigate(`/gyan/${cat.id}`)}>
                <div
                  className="p-3.5 rounded-2xl shrink-0"
                  style={{ backgroundColor: c.bg, border: `1px solid ${c.border}`, boxShadow: c.glow }}
                >
                  <Icon size={26} style={{ color: c.text }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold font-hindi text-prakriti-white mb-1">{cat.titleHi}</h3>
                  <p className="text-xs font-hindi text-prakriti-muted truncate">{cat.description}</p>
                </div>
                <ChevronRight size={20} className="text-prakriti-muted shrink-0" />
              </GlassCard>
            </motion.div>
          )
        }) : (
          <GlassCard className="p-8 text-center">
            <p className="text-sm font-hindi text-prakriti-muted">{language === 'hi' ? 'कोई विषय नहीं मिला।' : 'No topics found.'}</p>
          </GlassCard>
        )}
      </div>
    </div>
  )
}
