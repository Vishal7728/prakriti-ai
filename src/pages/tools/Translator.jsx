import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'
import { processQuery } from '../../services/ai/AIService.js'
import { useAppStore } from '../../app/stores.js'

export default function Translator() {
  const { mode } = useAppStore()
  const [text, setText] = useState('')
  const [out, setOut] = useState('')
  const [loading, setLoading] = useState(false)
  const translate = async () => {
    if (!text.trim()) return
    setLoading(true); setOut('')
    try { const r = await processQuery(`अनुवाद करें: "${text}"`, mode); setOut(r) } catch (e) { setOut('त्रुटि') }
    setLoading(false)
  }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="अनुवादक" />
      <GlassCard className="p-4 mb-3"><textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="यहाँ लिखें..." rows={4} className="w-full bg-transparent text-sm font-hindi text-prakriti-white resize-none focus:outline-none" /></GlassCard>
      <NeonButton variant="pink" size="md" fullWidth onClick={translate} disabled={loading || !text.trim()} className="mb-4">{loading ? 'अनुवाद हो रहा है...' : 'अनुवाद करें'}</NeonButton>
      {out && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><GlassCard neonBorder="green" className="p-4"><h3 className="text-xs font-hindi text-prakriti-muted mb-2">अनुवाद</h3><p className="text-sm font-hindi text-prakriti-white">{out}</p></GlassCard></motion.div>}
    </div>
  )
}