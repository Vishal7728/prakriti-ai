import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Heart, Atom, Cpu, Activity } from 'lucide-react'
import GlassCard from '../components/common/GlassCard.jsx'
import PageHeader from '../components/common/PageHeader.jsx'

const CATEGORIES = [
  { id: 'medical', title: 'चिकित्सा विज्ञान', desc: 'शरीर और चिकित्सा का ज्ञान', icon: Heart, color: 'pink' },
  { id: 'science', title: 'विज्ञान', desc: 'भौतिकी, रसायन और जीवन', icon: Atom, color: 'green' },
  { id: 'technology', title: 'आईटी/एआई', desc: 'प्रौद्योगिकी और एआई', icon: Cpu, color: 'gold' },
  { id: 'yoga', title: 'योगासन', desc: 'शारीरिक और मानसिक योग', icon: Activity, color: 'pink' },
]

export default function Gyan() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="शरीर का प्रकृति" subtitle="सीखें, समझें और आगे बढ़ें" />
      
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-prakriti-muted" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="विषय खोजें..." className="w-full pl-12 pr-4 py-3 rounded-xl bg-prakriti-card border border-prakriti-border text-sm font-hindi text-prakriti-white focus:border-prakriti-pink" />
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = cat.icon
          const colorClass = cat.color === 'pink' ? 'text-prakriti-pink' : cat.color === 'green' ? 'text-prakriti-green' : 'text-prakriti-gold'
          return (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <GlassCard hover className="p-5 flex items-center gap-4" onClick={() => navigate(`/gyan/${cat.id}`)}>
                <div className="p-3 rounded-xl bg-prakriti-card border border-prakriti-border">
                  <Icon size={24} className={colorClass} />
                </div>
                <div>
                  <h3 className="text-base font-bold font-hindi text-prakriti-white mb-1">{cat.title}</h3>
                  <p className="text-xs font-hindi text-prakriti-muted">{cat.desc}</p>
                </div>
              </GlassCard>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}