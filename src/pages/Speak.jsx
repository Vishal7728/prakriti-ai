import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Keyboard, Settings, Send, Mic, Square } from 'lucide-react'
import PrakritiHero from '../components/avatar/PrakritiHero.jsx'
import Waveform from '../components/voice/Waveform.jsx'
import { useAppStore, useVoiceStore } from '../app/stores.js'
import { processQuery } from '../services/ai/AIService.js'
import { startListening, stopListening } from '../services/voice/speechToText.js'
import { speak, stopSpeaking } from '../services/voice/textToSpeech.js'

const STATE_META = {
  idle: { hintHi: 'बोलने के लिए नीचे दबाएँ', hintEn: 'Tap below to speak', accent: '#FF3B9D' },
  listening: { hintHi: 'सुन रही हूँ...', hintEn: 'Listening...', accent: '#55E88A' },
  thinking: { hintHi: 'सोच रही हूँ...', hintEn: 'Thinking...', accent: '#E8B94A' },
  speaking: { hintHi: 'उत्तर दे रही हूँ...', hintEn: 'Answering...', accent: '#FF3B9D' },
  error: { hintHi: 'कुछ गड़बड़ हुई, फिर कोशिश करें', hintEn: 'Something went wrong, try again', accent: '#FF4757' },
}

export default function Speak() {
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, language } = useAppStore()
  const { voiceState, setVoiceState, transcript, setTranscript, response, setResponse, setListening, setSpeaking, voiceEnabled, autoSpeak, reset } = useVoiceStore()
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState('')

  useEffect(() => {
    reset()
    const incoming = location.state?.query
    if (incoming) { setTranscript(incoming); handleProcessQuery(incoming) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleListen = () => {
    if (voiceState === 'listening') { stopListening(); setVoiceState('idle'); setListening(false); return }
    setVoiceState('listening'); setListening(true)
    startListening(
      (interim) => setTranscript(interim),
      (final) => { setTranscript(final); setListening(false); handleProcessQuery(final) },
      () => { setVoiceState('error'); setListening(false) }
    )
  }

  const handleProcessQuery = async (query) => {
    if (!query || !query.trim()) return
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

  const meta = STATE_META[voiceState] || STATE_META.idle

  return (
    <div className="fixed inset-0 flex flex-col z-10" style={{ background: 'rgba(5, 6, 9, 0.96)', backdropFilter: 'blur(20px)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-prakriti-border shrink-0">
        <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-prakriti-card border border-prakriti-border active:scale-95 transition-transform">
          <ArrowLeft size={20} className="text-prakriti-white" />
        </button>
        <h1 className="text-base font-semibold font-hindi text-prakriti-white">{language === 'hi' ? 'प्रकृति से बात करें' : 'Talk to Prakriti'}</h1>
        <button onClick={() => navigate('/settings')} className="p-2 rounded-xl bg-prakriti-card border border-prakriti-border active:scale-95 transition-transform">
          <Settings size={18} className="text-prakriti-muted" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-5 pt-4 pb-4 overflow-y-auto scrollbar-hide">
        {/* Hero with state glow */}
        <div className="relative w-full max-w-[260px] mb-2">
          <div
            className="absolute inset-x-4 top-1/4 bottom-0 rounded-full pointer-events-none transition-all duration-700"
            style={{ background: `radial-gradient(ellipse at center, ${meta.accent}26 0%, transparent 70%)`, filter: 'blur(20px)' }}
          />
          <PrakritiHero state={voiceState} className="w-full" />
        </div>

        {/* Waveform when active */}
        <div className="h-10 my-3 flex items-center">
          {(voiceState === 'listening' || voiceState === 'speaking' || voiceState === 'thinking') && (
            <Waveform active color={meta.accent} bars={32} height={36} />
          )}
        </div>

        {/* Transcript & Response */}
        <div className="text-center px-2 max-w-md w-full">
          <AnimatePresence mode="wait">
            {!transcript ? (
              <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-base font-hindi text-prakriti-white">
                {language === 'hi' ? meta.hintHi : meta.hintEn}
              </motion.p>
            ) : (
              <motion.div key="transcript" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <p className="text-xs font-hindi text-prakriti-muted mb-2">{language === 'hi' ? 'आपने पूछा:' : 'You asked:'}</p>
                <h2 className="text-lg font-semibold font-hindi text-prakriti-gold mb-5 leading-relaxed">{transcript}</h2>
                {response && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-left p-4 rounded-2xl bg-prakriti-card border border-prakriti-border">
                    <p className="text-xs font-hindi text-prakriti-muted mb-1.5">{language === 'hi' ? 'प्रकृति का उत्तर:' : 'Prakriti says:'}</p>
                    <p className="text-sm font-hindi text-prakriti-white whitespace-pre-wrap leading-relaxed">{response}</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Text Input Fallback */}
      <AnimatePresence>
        {showTextInput && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-5 mb-3 overflow-hidden">
            <div className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTextSubmit()}
                placeholder={language === 'hi' ? 'यहाँ टाइप करें...' : 'Type here...'}
                className="flex-1 px-4 py-3 rounded-full bg-prakriti-card border border-prakriti-border text-sm font-hindi text-prakriti-white placeholder-prakriti-muted focus:border-prakriti-pink transition-colors"
                autoFocus
              />
              <button onClick={handleTextSubmit} className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 active:scale-90 transition-transform"
                style={{ background: 'linear-gradient(135deg, #FF3B9D, #FF4FA8)', boxShadow: '0 0 20px rgba(255,59,157,0.3)' }}>
                <Send size={18} color="#FFFFFF" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Controls */}
      <div className="px-8 pt-4 pb-8 flex flex-col items-center gap-4 border-t border-prakriti-border shrink-0" style={{ background: 'rgba(8, 9, 13, 0.8)' }}>
        {voiceState === 'speaking' ? (
          <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
            <motion.div
              className="absolute rounded-full border-2"
              style={{ borderColor: 'rgba(255, 59, 157, 0.3)', width: 80, height: 80 }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <button
              onClick={() => { stopSpeaking(); setVoiceState('idle'); setSpeaking(false) }}
              className="w-20 h-20 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #FF3B9D, #E8B94A)', boxShadow: '0 0 35px rgba(255,59,157,0.5)' }}
            >
              <Square size={26} color="#FFFFFF" />
            </button>
          </div>
        ) : voiceState === 'listening' ? (
          <div className="relative flex items-center justify-center" style={{ width: 110, height: 110 }}>
            <motion.div className="absolute rounded-full border-2" style={{ borderColor: 'rgba(85, 232, 138, 0.35)', width: 80, height: 80 }} animate={{ scale: [1, 1.5], opacity: [0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
            <motion.div className="absolute rounded-full border-2" style={{ borderColor: 'rgba(85, 232, 138, 0.25)', width: 80, height: 80 }} animate={{ scale: [1, 1.8], opacity: [0.4, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }} />
            <button onClick={handleListen} className="w-20 h-20 rounded-full flex items-center justify-center active:scale-95 transition-transform"
              style={{ background: 'linear-gradient(135deg, #55E88A, #72FF9B)', boxShadow: '0 0 40px rgba(85,232,138,0.5)' }}>
              <Square size={26} color="#050609" />
            </button>
          </div>
        ) : (
          <motion.button
            onClick={handleListen}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: voiceState === 'error' ? 'linear-gradient(135deg, #FF4757, #FF6B7A)' : 'linear-gradient(135deg, #FF3B9D, #FF4FA8)',
              boxShadow: voiceState === 'error' ? '0 0 30px rgba(255,71,87,0.4)' : '0 0 30px rgba(255,59,157,0.45), 0 8px 25px rgba(255,59,157,0.3)',
              border: '2px solid rgba(255,255,255,0.15)',
            }}
          >
            <Mic size={30} color="#FFFFFF" />
          </motion.button>
        )}

        <button onClick={() => setShowTextInput(!showTextInput)} className="flex items-center gap-2 text-xs font-hindi text-prakriti-muted hover:text-prakriti-pink transition-colors">
          <Keyboard size={14} />
          {language === 'hi' ? 'कीबोर्ड से लिखें' : 'Type with keyboard'}
        </button>
      </div>
    </div>
  )
}
