import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Wifi, HardDrive, Languages, Mic, Volume2, Palette, Trash2, Info, Shield, Zap, Sun, Moon } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'
import NeonButton from '../components/common/NeonButton.jsx'
import { useAppStore, useVoiceStore, useSettingsStore, useAIStore } from '../app/stores.js'

export default function Settings() {
  const [active, setActive] = useState('ai')
  const { mode, setMode, language, setLanguage, theme, setTheme } = useAppStore()
  const { voiceEnabled, setVoiceEnabled, autoSpeak, setAutoSpeak } = useVoiceStore()
  const { clearAllData } = useSettingsStore()
  const { onlineProvider, setOnlineProvider } = useAIStore()

  const SECTIONS = [
    { id: 'ai', label: 'AI मोड', icon: Zap }, { id: 'language', label: 'भाषा', icon: Languages },
    { id: 'voice', label: 'आवाज़', icon: Mic }, { id: 'appearance', label: 'रूप', icon: Palette },
    { id: 'privacy', label: 'प्राइवेसी', icon: Shield }, { id: 'about', label: 'परिचय', icon: Info },
  ]
  const languages = [
    { id: 'hi', label: 'हिंदी' }, { id: 'en', label: 'English' },
    { id: 'bhojpuri', label: 'भोजपुरी' }, { id: 'marathi', label: 'मराठी' }, { id: 'tamil', label: 'தமிழ்' },
  ]

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="सेटिंग्स" subtitle="अपनी प्राथमिकताएं अनुकूलित करें" />
      <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-6 pb-2">
        {SECTIONS.map((s) => (
          <button key={s.id} onClick={() => setActive(s.id)} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-hindi whitespace-nowrap ${active === s.id ? 'neon-pink-border bg-prakriti-card text-prakriti-pink' : 'bg-prakriti-card border border-prakriti-border text-prakriti-muted'}`}>
            <s.icon size={14} /> {s.label}
          </button>
        ))}
      </div>

      {active === 'ai' && (
        <GlassCard className="p-5 space-y-2">
          <button onClick={() => setMode('online')} className={`w-full flex items-center justify-between p-4 rounded-xl ${mode === 'online' ? 'neon-green-border bg-prakriti-card' : 'bg-prakriti-card border border-prakriti-border'}`}>
            <div className="flex items-center gap-3"><Wifi size={20} className={mode === 'online' ? 'text-prakriti-green' : 'text-prakriti-muted'} /><div className="text-left"><p className="text-sm font-hindi text-prakriti-white">ऑनलाइन मोड</p></div></div>
            <div className={`w-5 h-5 rounded-full border-2 ${mode === 'online' ? 'border-prakriti-green bg-prakriti-green' : 'border-prakriti-muted'}`}>{mode === 'online' && <div className="w-2 h-2 bg-prakriti-bg rounded-full m-auto mt-[3px]" />}</div>
          </button>
          <button onClick={() => setMode('offline')} className={`w-full flex items-center justify-between p-4 rounded-xl ${mode === 'offline' ? 'neon-gold-border bg-prakriti-card' : 'bg-prakriti-card border border-prakriti-border'}`}>
            <div className="flex items-center gap-3"><HardDrive size={20} className={mode === 'offline' ? 'text-prakriti-gold' : 'text-prakriti-muted'} /><div className="text-left"><p className="text-sm font-hindi text-prakriti-white">ऑफलाइन मोड</p></div></div>
            <div className={`w-5 h-5 rounded-full border-2 ${mode === 'offline' ? 'border-prakriti-gold bg-prakriti-gold' : 'border-prakriti-muted'}`}>{mode === 'offline' && <div className="w-2 h-2 bg-prakriti-bg rounded-full m-auto mt-[3px]" />}</div>
          </button>
        </GlassCard>
      )}

      {active === 'language' && (
        <GlassCard className="p-5 space-y-2">
          {languages.map((l) => (
            <button key={l.id} onClick={() => setLanguage(l.id)} className={`w-full flex items-center justify-between p-4 rounded-xl ${language === l.id ? 'neon-gold-border bg-prakriti-card' : 'bg-prakriti-card border border-prakriti-border'}`}>
              <p className="text-sm font-hindi text-prakriti-white">{l.label}</p>
              <div className={`w-5 h-5 rounded-full border-2 ${language === l.id ? 'border-prakriti-gold bg-prakriti-gold' : 'border-prakriti-muted'}`}>{language === l.id && <div className="w-2 h-2 bg-prakriti-bg rounded-full m-auto mt-[3px]" />}</div>
            </button>
          ))}
        </GlassCard>
      )}

      {active === 'voice' && (
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3"><Volume2 size={20} className="text-prakriti-pink" /><span className="text-sm font-hindi text-prakriti-white">आवाज़ सक्षम</span></div>
            <button onClick={() => setVoiceEnabled(!voiceEnabled)} className={`w-12 h-6 rounded-full ${voiceEnabled ? 'bg-prakriti-green' : 'bg-prakriti-muted-dark'}`}><div className={`w-5 h-5 rounded-full bg-white ${voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><Mic size={20} className="text-prakriti-pink" /><span className="text-sm font-hindi text-prakriti-white">स्वतः बोलें</span></div>
            <button onClick={() => setAutoSpeak(!autoSpeak)} className={`w-12 h-6 rounded-full ${autoSpeak ? 'bg-prakriti-green' : 'bg-prakriti-muted-dark'}`}><div className={`w-5 h-5 rounded-full bg-white ${autoSpeak ? 'translate-x-6' : 'translate-x-0.5'}`} /></button>
          </div>
        </GlassCard>
      )}

      {active === 'appearance' && (
        <GlassCard className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setTheme('dark')} className={`flex flex-col items-center gap-2 p-4 rounded-xl ${theme === 'dark' ? 'neon-pink-border bg-prakriti-card' : 'bg-prakriti-card border border-prakriti-border'}`}><Moon size={24} className={theme === 'dark' ? 'text-prakriti-pink' : 'text-prakriti-muted'} /><span className="text-sm font-hindi text-prakriti-white">डार्क मोड</span></button>
            <button onClick={() => setTheme('light')} className={`flex flex-col items-center gap-2 p-4 rounded-xl ${theme === 'light' ? 'neon-gold-border bg-prakriti-card' : 'bg-prakriti-card border border-prakriti-border'}`}><Sun size={24} className={theme === 'light' ? 'text-prakriti-gold' : 'text-prakriti-muted'} /><span className="text-sm font-hindi text-prakriti-white">लाइट मोड</span></button>
          </div>
        </GlassCard>
      )}

      {active === 'privacy' && (
        <GlassCard className="p-5">
          <p className="text-xs font-hindi text-prakriti-muted mb-4">आपका सभी डेटा आपके डिवाइस पर स्थानीय रूप से संग्रहीत है।</p>
          <NeonButton variant="ghost" size="sm" fullWidth icon={Trash2} onClick={() => { if (confirm('क्या आप सभी डेटा को हटाना चाहते हैं?')) { clearAllData() } }}>सभी डेटा हटाएं</NeonButton>
        </GlassCard>
      )}

      {active === 'about' && (
        <GlassCard className="p-5 text-center">
          <h3 className="text-lg font-bold text-prakriti-white mb-2">PRAKRITI AI</h3>
          <p className="text-xs font-hindi text-prakriti-muted">संस्करण 1.0.0</p>
          <p className="text-xs font-hindi text-prakriti-muted mt-4">Made with ♥ in Bharat</p>
        </GlassCard>
      )}
    </div>
  )
}