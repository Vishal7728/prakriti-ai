import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Ruler, Code2, Image as ImageIcon, Mic } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'
import NeonButton from '../../components/common/NeonButton.jsx'

const toolsConfig = {
  scan: { title: 'Scan to Answer', icon: Upload }, summary: { title: 'Summary', icon: FileText }, pdf: { title: 'PDF Chat', icon: FileText },
  'unit-converter': { title: 'Unit Converter', icon: Ruler }, code: { title: 'Code Helper', icon: Code2 },
  'image-to-text': { title: 'Image to Text', icon: ImageIcon }, 'voice-notes': { title: 'Voice Notes', icon: Mic },
}

export default function ExtraTools({ toolId }) {
  const config = toolsConfig[toolId] || { title: 'Tool', icon: FileText }
  const Icon = config.icon
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const handleAction = () => { if (!input.trim()) return; setOutput('यह सुविधा वर्तमान में डेमो मोड में है। पूर्ण कार्यक्षमता के लिए AI कनेक्ट करें।') }
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title={config.title} />
      <GlassCard className="p-5 mb-4">
        <div className="flex items-center gap-2 mb-3"><Icon size={20} className="text-prakriti-pink" /><h3 className="text-sm font-hindi text-prakriti-white">इनपुट</h3></div>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="यहाँ अपना टेक्स्ट या डेटा दर्ज करें..." rows={4} className="w-full bg-prakriti-card border border-prakriti-border rounded-xl p-3 text-sm text-prakriti-white mb-4 focus:border-prakriti-pink outline-none" />
        <NeonButton variant="pink" size="md" fullWidth onClick={handleAction}>प्रोसेस करें</NeonButton>
      </GlassCard>
      {output && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><GlassCard neonBorder="green" className="p-5"><h3 className="text-sm font-hindi text-prakriti-green mb-2">परिणाम</h3><p className="text-sm text-prakriti-white">{output}</p></GlassCard></motion.div>)}
    </div>
  )
}