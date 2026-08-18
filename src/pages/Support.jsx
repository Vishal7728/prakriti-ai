import React from 'react'
import { Headphones } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import GlassCard from '../components/common/GlassCard.jsx'

export default function Support() {
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="27x7 सहायता" subtitle="हमेशा आपके साथ" />
      <GlassCard neonBorder="pink" className="p-6 text-center mb-6">
        <div className="flex justify-center mb-3"><div className="p-4 rounded-full neon-pink-border"><Headphones size={32} className="text-prakriti-pink" /></div></div>
        <h2 className="text-lg font-bold font-hindi text-prakriti-white mb-1">27x7 सहायता</h2>
        <p className="text-sm font-hindi text-prakriti-muted">हम सप्ताह के 27 दिन, 24 घंटे आपके लिए उपलब्ध हैं</p>
      </GlassCard>
      <div className="space-y-2">
        {[{ q: 'ऑफलाइन मोड कैसे सक्रिय करें?', a: 'सेटिंग्स में जाकर ऑफलाइन मोड चुनें।' }, { q: 'आवाज़ कैसे बदलें?', a: 'सेटिंग्स > आवाज़ में जाकर आवाज़ चुनें।' }].map((f, i) => (
          <GlassCard key={i} className="p-4"><p className="text-sm font-hindi text-prakriti-white mb-1">{f.q}</p><p className="text-xs font-hindi text-prakriti-muted">{f.a}</p></GlassCard>
        ))}
      </div>
    </div>
  )
}