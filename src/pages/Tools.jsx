import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanLine, Calculator, Languages, PenLine, FileText, FileQuestion, Ruler, Code2, Image, Mic, MoreHorizontal, Sigma } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'
import { useAppStore } from '../app/stores.js'

const TOOLS = [
  { id: 'scan', title: 'Scan to Answer', icon: ScanLine, theme: 'pink' },
  { id: 'math', title: 'Maths Solver', icon: Sigma, theme: 'gold' },
  { id: 'calculator', title: 'Calculator', icon: Calculator, theme: 'green' },
  { id: 'translator', title: 'Translator', icon: Languages, theme: 'pink' },
  { id: 'writer', title: 'Writer', icon: PenLine, theme: 'gold' },
  { id: 'summary', title: 'Summary', icon: FileText, theme: 'green' },
  { id: 'pdf', title: 'PDF Chat', icon: FileQuestion, theme: 'pink' },
  { id: 'unit-converter', title: 'Unit Converter', icon: Ruler, theme: 'gold' },
  { id: 'code', title: 'Code Helper', icon: Code2, theme: 'green' },
  { id: 'image-to-text', title: 'Image to Text', icon: Image, theme: 'pink' },
  { id: 'voice-notes', title: 'Voice Notes', icon: Mic, theme: 'gold' },
  { id: 'more', title: 'More Tools', icon: MoreHorizontal, theme: 'green' },
]

const getThemeStyles = (theme) => {
  switch (theme) {
    case 'pink':
      return { iconColor: '#FF3B9D', bg: 'linear-gradient(145deg, rgba(255,59,157,0.14) 0%, rgba(13,15,18,0.9) 60%)', border: '1px solid rgba(255,59,157,0.3)', shadow: '0 4px 20px rgba(255,59,157,0.1)' }
    case 'green':
      return { iconColor: '#55E88A', bg: 'linear-gradient(145deg, rgba(85,232,138,0.14) 0%, rgba(13,15,18,0.9) 60%)', border: '1px solid rgba(85,232,138,0.3)', shadow: '0 4px 20px rgba(85,232,138,0.1)' }
    case 'gold':
      return { iconColor: '#E8B94A', bg: 'linear-gradient(145deg, rgba(232,185,74,0.14) 0%, rgba(13,15,18,0.9) 60%)', border: '1px solid rgba(232,185,74,0.3)', shadow: '0 4px 20px rgba(232,185,74,0.1)' }
    default:
      return { iconColor: '#8F8A92', bg: 'rgba(13,15,18,0.9)', border: '1px solid rgba(255,255,255,0.08)', shadow: 'none' }
  }
}

export default function Tools() {
  const navigate = useNavigate()
  const { language } = useAppStore()

  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader
        title={language === 'hi' ? 'टूल्स' : 'Tools'}
        subtitle={language === 'hi' ? 'आपकी सुविधा के लिए विशेष उपकरण' : 'Special tools for your convenience'}
      />

      <div className="grid grid-cols-2 gap-3.5">
        {TOOLS.map((t, i) => {
          const styles = getThemeStyles(t.theme)
          return (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 24 }}
            >
              <button
                onClick={() => navigate(`/tools/${t.id}`)}
                className="w-full h-full p-4 rounded-2xl flex flex-col items-start gap-3 transition-all active:scale-95"
                style={{ background: styles.bg, border: styles.border, boxShadow: styles.shadow, backdropFilter: 'blur(10px)' }}
              >
                <div
                  className="p-2.5 rounded-xl"
                  style={{ backgroundColor: 'rgba(5, 6, 9, 0.6)', border: `1px solid ${styles.iconColor}40` }}
                >
                  <t.icon size={22} style={{ color: styles.iconColor }} />
                </div>
                <h3 className="text-[13px] font-semibold text-prakriti-white leading-tight">{t.title}</h3>
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
