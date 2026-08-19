import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, BookOpen } from 'lucide-react'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { gyanCategories } from '../data/gyan.js'

const CATEGORY_COLORS = {
  medical: '#FF3B9D',
  science: '#55E88A',
  technology: '#E8B94A',
  yoga: '#FF3B9D',
}

export default function GyanCategory() {
  const { category: catId } = useParams()
  const navigate = useNavigate()
  const cat = gyanCategories.find((c) => c.id === catId)
  if (!cat) {
    return (
      <div className="page-container px-5">
        <PageHeader title="विषय नहीं मिला" subtitle="कृपया ज्ञान पृष्ठ से पुनः प्रयास करें" />
        <GlassCard className="p-8 text-center">
          <BookOpen size={32} className="text-prakriti-muted mx-auto mb-3" />
          <p className="text-sm font-hindi text-prakriti-muted">यह श्रेणी उपलब्ध नहीं है।</p>
        </GlassCard>
      </div>
    )
  }
  const accent = CATEGORY_COLORS[cat.id] || '#FF3B9D'

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title={cat.titleHi} subtitle={cat.description} />
      <div className="space-y-3">
        {cat.topics.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
            <GlassCard hover className="p-4 flex items-center justify-between" onClick={() => navigate(`/gyan/${catId}/${t.id}`)}>
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-2 h-9 rounded-full shrink-0" style={{ background: accent, boxShadow: `0 0 10px ${accent}80` }} />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold font-hindi text-prakriti-white mb-1 truncate">{t.title}</h3>
                  <p className="text-xs font-hindi text-prakriti-muted truncate">{t.description}</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-prakriti-muted shrink-0" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
