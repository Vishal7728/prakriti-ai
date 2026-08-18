import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import { gyanCategories } from '../data/gyan.js'

export default function GyanCategory() {
  const { category: catId } = useParams()
  const navigate = useNavigate()
  const cat = gyanCategories.find((c) => c.id === catId)
  if (!cat) return <div className="page-container px-5"><PageHeader title="विषय नहीं मिला" /></div>
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title={cat.titleHi} subtitle={cat.description} />
      <div className="space-y-3">
        {cat.topics.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
            <GlassCard hover className="p-4 flex items-center justify-between" onClick={() => navigate(`/gyan/${catId}/${t.id}`)}>
              <div>
                <h3 className="text-sm font-hindi text-prakriti-white mb-1">{t.title}</h3>
                <p className="text-xs font-hindi text-prakriti-muted">{t.description}</p>
              </div>
              <ArrowRight size={18} className="text-prakriti-muted" />
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}