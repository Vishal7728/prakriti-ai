import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'
import PrakritiAvatar from '../components/avatar/PrakritiAvatar.jsx'
import { processQuery } from '../services/ai/AIService.js'
import { speak } from '../services/voice/textToSpeech.js'
import { gyanCategories } from '../data/gyan.js'
import { useAppStore } from '../app/stores.js'

export default function GyanTopic() {
  const { category: catId, topic: topicId } = useParams()
  const { mode } = useAppStore()
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const cat = gyanCategories.find((c) => c.id === catId)
  const topic = cat?.topics.find((t) => t.id === topicId)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const res = await processQuery(`${topic?.title} के बारे में बताइए`, mode)
      setContent(res)
      setLoading(false)
    }
    load()
  }, [topic, mode])

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title={topic?.title} subtitle={cat?.titleHi} />
      {loading ? (
        <div className="flex flex-col items-center py-12"><PrakritiAvatar size="md" state="thinking" /><p className="text-sm font-hindi text-prakriti-muted mt-4">प्रकृति ज्ञान प्राप्त कर रही है...</p></div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-5 mb-6">
            <p className="text-sm font-hindi text-prakriti-white leading-relaxed whitespace-pre-wrap">{content}</p>
          </GlassCard>
          <button onClick={() => speak(content)} className="w-full p-3 rounded-xl bg-prakriti-card border border-prakriti-green text-sm font-hindi text-prakriti-green">सुनें</button>
        </motion.div>
      )}
    </div>
  )
}