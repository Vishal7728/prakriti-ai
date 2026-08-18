import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScanLine, Calculator, Languages, PenLine, FileText, FileQuestion, Ruler, Code2, Image, Mic, MoreHorizontal } from 'lucide-react'
import PageHeader from '../components/common/PageHeader.jsx'

// Added gradient and border colors for each plate
const TOOLS = [
  { id: 'scan', title: 'Scan to Answer', icon: ScanLine, theme: 'pink' },
  { id: 'math', title: 'Maths Solver', icon: Calculator, theme: 'gold' },
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

// Helper function to get styles based on theme
const getThemeStyles = (theme) => {
  switch (theme) {
    case 'pink':
      return { 
        iconColor: '#FF3B9D', 
        bg: 'linear-gradient(135deg, rgba(255,59,157,0.15) 0%, rgba(13,15,18,0.8) 100%)', 
        border: '1px solid rgba(255,59,157,0.3)',
        shadow: '0 4px 20px rgba(255,59,157,0.1)'
      }
    case 'green':
      return { 
        iconColor: '#55E88A', 
        bg: 'linear-gradient(135deg, rgba(85,232,138,0.15) 0%, rgba(13,15,18,0.8) 100%)', 
        border: '1px solid rgba(85,232,138,0.3)',
        shadow: '0 4px 20px rgba(85,232,138,0.1)'
      }
    case 'gold':
      return { 
        iconColor: '#E8B94A', 
        bg: 'linear-gradient(135deg, rgba(232,185,74,0.15) 0%, rgba(13,15,18,0.8) 100%)', 
        border: '1px solid rgba(232,185,74,0.3)',
        shadow: '0 4px 20px rgba(232,185,74,0.1)'
      }
    default:
      return {}
  }
}

export default function Tools() {
  const navigate = useNavigate()
  
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="रचित काम" subtitle="आपकी सुविधा के लिए विशेष उपकरण" />
      
      <div className="grid grid-cols-2 gap-4">
        {TOOLS.map((t, i) => {
          const styles = getThemeStyles(t.theme)
          return (
            <motion.div 
              key={t.id} 
              initial={{ opacity: 0, scale: 0.9 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ delay: i * 0.05 }}
            >
              <button 
                onClick={() => navigate(`/tools/${t.id}`)}
                className="w-full h-full p-4 rounded-2xl flex flex-col items-start gap-3 transition-all active:scale-95 hover:scale-100"
                style={{ 
                  background: styles.bg, 
                  border: styles.border, 
                  boxShadow: styles.shadow,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div 
                  className="p-2.5 rounded-xl" 
                  style={{ backgroundColor: 'rgba(5, 6, 9, 0.6)', border: `1px solid ${styles.iconColor}40` }}
                >
                  <t.icon size={22} style={{ color: styles.iconColor }} />
                </div>
                <h3 className="text-sm font-semibold text-prakriti-white">{t.title}</h3>
              </button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}