import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'
import { processQuery } from '../../services/ai/AIService.js'
import { useAppStore } from '../../app/stores.js'

export default function Writer() {
  const { mode } = useAppStore()
  const [topic, setTopic] = useState('')
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)
  const write = async () => {
    if (!topic.trim()) return
    setLoading(true); setOut('')
    try { const r = await processQuery(`इस विषय पर लेख लिखें: ${topic}`, mode); setOut(r) } catch (e) { setOut('त्रुटि') }
    setLoading(false)
  }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="लेखक" />
      <GlassCard className="p-4 mb-4"><textarea value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="विषय या शीर्षक दर्ज करें..." rows={4} className="w-full bg-transparent text-sm font-hindi text-prakriti-white resize-none focus:outline-none" /></GlassCard>
      <NeonButton variant="gold" size="md" fullWidth onClick={write} disabled={loading || !topic.trim()} className="mb-4">{loading ? 'लिखा जा रहा है...' : 'लिखें'}</NeonButton>
      {out && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><GlassCard neonBorder="gold" className="p-4"><h3 className="text-xs font-hindi text-prakriti-muted mb-2">परिणाम</h3><p className="text-sm font-hindi text-prakriti-white whitespace-pre-wrap">{out}</p></GlassCard></motion.div>}
    </div>
  )
}