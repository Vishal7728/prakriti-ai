import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Keyboard, Settings, Mic, Square } from 'lucide-react'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx' // Changed to Hero
import VoiceButton from '../components/voice/VoiceButton.jsx'
import Waveform from '../components/voice/Waveform.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import { useAppStore, useVoiceStore } from '../app/stores.js'
import { processQuery } from '../services/ai/AIService.js'
import { startListening, stopListening } from '../services/voice/speechToText.js'
import { speak, stopSpeaking } from '../services/voice/textToSpeech.js'

export default function Speak() {
  const navigate = useNavigate()
  const { mode } = useAppStore()
  const { voiceState, setVoiceState, transcript, setTranscript, response, setResponse, setListening, setSpeaking, voiceEnabled, autoSpeak, reset } = useVoiceStore()
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState('')

  useEffect(() => { reset() }, [reset])

  const handleListen = () => {
    if (voiceState === 'listening') { stopListening(); setVoiceState('idle'); setListening(false); return }
    setVoiceState('listening'); setListening(true)
    startListening(
      (interim) => setTranscript(interim),
      (final) => { setTranscript(final); setListening(false); handleProcessQuery(final) },
      (err) => { setVoiceState('error'); setListening(false) }
    )
  }

  const handleProcessQuery = async (query) => {
    if (!query.trim()) return
    setVoiceState('thinking')
    const saved = JSON.parse(localStorage.getItem('prakriti-search-history') || '[]')
    saved.unshift({ id: Date.now(), query, timestamp: Date.now(), mode })
    localStorage.setItem('prakriti-search-history', JSON.stringify(saved.slice(0, 50)))
    try {
      const result = await processQuery(query, mode)
      setResponse(result)
      setVoiceState('speaking'); setSpeaking(true)
      if (voiceEnabled && autoSpeak) {
        speak(result, () => { setVoiceState('idle'); setSpeaking(false) })
      } else { setTimeout(() => { setVoiceState('idle'); setSpeaking(false) }, 2000) }
    } catch (err) { setVoiceState('error') }
  }

  const handleTextSubmit = () => {
    if (textInput.trim()) { setTranscript(textInput); handleProcessQuery(textInput); setTextInput(''); setShowTextInput(false) }
  }

  return (
    <div className="fixed inset-0 flex flex-col z-10 bg-prakriti-bg/90 backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-prakriti-border">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-prakriti-card"><ArrowLeft size={20} className="text-prakriti-white" /></button>
        <h1 className="text-sm font-hindi text-prakriti-white">प्रकृति से बात करें</h1>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-lg hover:bg-prakriti-card"><Settings size={18} className="text-prakriti-muted" /></button>
      </div>

      {/* Avatar Section (Top) */}
      <div className="flex-1 flex flex-col items-center justify-start px-5 pt-4 pb-4 overflow-y-auto scrollbar-hide">
        {/* Using Full Hero Image */}
        <div className="w-full max-w-xs mb-4">
          <PrakritiHero state={voiceState} className="w-full" />
        </div>
        
        {/* Transcription Text */}
        <div className="mt-4 text-center px-4 max-w-md w-full">
          {transcript ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-hindi text-prakriti-muted mb-2">आपने पूछा:</motion.p>
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-base font-hindi text-prakriti-white mb-2">
              बोलने के लिए नीचे दबाएँ
            </motion.p>
          )}
          <AnimatePresence>
            {transcript && (
              <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-lg font-hindi text-prakriti-gold mb-4">
                {transcript}
              </motion.h2>
            )}
            {response && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-sm font-hindi text-prakriti-muted mb-1">प्रकृति का उत्तर:</p>
                <p className="text-sm font-hindi text-prakriti-white whitespace-pre-wrap">{response}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Waveform when active */}
        {(voiceState === 'listening' || voiceState === 'speaking') && (
          <div className="mt-6"><Waveform active={true} color={voiceState === 'listening' ? '#55E88A' : '#FF3B9D'} bars={32} height={36} /></div>
        )}
      </div>

      {/* Text Input Fallback */}
      <AnimatePresence>
        {showTextInput && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-5 mb-4">
            <div className="flex gap-2">
              <input type="text" value={textInput} onChange={(e) => setTextInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()} placeholder="यहाँ टाइप करें..." className="flex-1 px-4 py-3 rounded-xl bg-prakriti-card border border-prakriti-border text-sm font-hindi text-prakriti-white focus:border-prakriti-pink" autoFocus />
              <button onClick={handleTextSubmit} className="px-4 py-3 rounded-xl bg-prakriti-pink text-white text-sm">भेजें</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="p-8 flex flex-col items-center gap-4 border-t border-prakriti-border bg-prakriti-surface/80">
        {voiceState === 'speaking' ? (
          <button onClick={() => { stopSpeaking(); setVoiceState('idle'); setSpeaking(false) }} className="w-20 h-20 rounded-full flex items-center justify-center active:scale-95" style={{ background: 'linear-gradient(135deg, #FF4757, #FF6B7A)', boxShadow: '0 0 30px rgba(255,71,87,0.4)' }}>
            <Square size={28} color="#FFFFFF" />
          </button>
        ) : (
          <VoiceButton state={voiceState} onClick={handleListen} size={80} />
        )}
        
        <button onClick={() => setShowTextInput(!showTextInput)} className="flex items-center gap-2 text-xs font-hindi text-prakriti-muted hover:text-prakriti-pink">
          <Keyboard size={14} />
          कीबोर्ड से लिखें
        </button>
      </div>
    </div>
  )
}