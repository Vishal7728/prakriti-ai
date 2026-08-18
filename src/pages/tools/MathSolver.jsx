import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'
import { processQuery } from '../../services/ai/AIService.js'
import { useAppStore } from '../../app/stores.js'

export default function MathSolver() {
  const { mode } = useAppStore()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const solve = async () => {
    if (!input.trim()) return
    setLoading(true); setOutput('')
    try { const res = await processQuery(`गणित समस्या हल करें: ${input}`, mode); setOutput(res) } catch (e) { setOutput('त्रुटि') }
    setLoading(false)
  }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="गणित समाधान" />
      <GlassCard className="p-5 mb-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="उदाहरण: 2 + 3 * 4" className="w-full p-3 rounded-xl bg-prakriti-card border border-prakriti-border text-base font-mono text-prakriti-white focus:border-prakriti-gold" />
        <NeonButton variant="gold" size="md" fullWidth className="mt-4" onClick={solve} disabled={loading || !input.trim()}>{loading ? 'हल किया जा रहा है...' : 'हल करें'}</NeonButton>
      </GlassCard>
      {output && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard neonBorder="green" className="p-5"><h3 className="text-sm font-hindi text-prakriti-muted mb-2">उत्तर</h3><p className="text-sm text-prakriti-white whitespace-pre-wrap">{output}</p></GlassCard>
        </motion.div>
      )}
    </div>
  )
}