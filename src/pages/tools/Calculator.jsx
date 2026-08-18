import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PageHeader from '../../components/common/PageHeader.jsx'
import GlassCard from '../../components/common/GlassCard.jsx'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [expr, setExpr] = useState('')
  const handleInput = (v) => setDisplay(display === '0' && v !== '.' ? v : display + v)
  const handleOp = (o) => { setExpr(expr + display + o); setDisplay('0') }
  const handleCalc = () => { try { const r = eval((expr + display).replace(/×/g, '*').replace(/÷/g, '/')); setDisplay(String(parseFloat(r.toFixed(10)))); setExpr('') } catch (e) { setDisplay('त्रुटि') } }
  const handleClear = () => { setDisplay('0'); setExpr('') }
  const handleDel = () => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')
  const buttons = [
    { l: 'C', a: handleClear, c: 'text-prakriti-red' }, { l: '(', a: () => handleInput('(') }, { l: ')', a: () => handleInput(')') }, { l: '÷', a: () => handleOp('÷'), c: 'text-prakriti-pink' },
    { l: '7', a: () => handleInput('7') }, { l: '8', a: () => handleInput('8') }, { l: '9', a: () => handleInput('9') }, { l: '×', a: () => handleOp('×'), c: 'text-prakriti-pink' },
    { l: '4', a: () => handleInput('4') }, { l: '5', a: () => handleInput('5') }, { l: '6', a: () => handleInput('6') }, { l: '-', a: () => handleOp('-'), c: 'text-prakriti-pink' },
    { l: '1', a: () => handleInput('1') }, { l: '2', a: () => handleInput('2') }, { l: '3', a: () => handleInput('3') }, { l: '+', a: () => handleOp('+'), c: 'text-prakriti-pink' },
    { l: '%', a: () => handleOp('%') }, { l: '0', a: () => handleInput('0') }, { l: '.', a: () => handleInput('.') }, { l: '=', a: handleCalc, t: 'eq' },
  ]
  return (
    <div className="page-container px-5 pt-4" style={{ zIndex: 1 }}>
      <PageHeader title="कैलकुलेटर" />
      <GlassCard className="p-5 mb-4 text-right">
        {expr && <p className="text-sm text-prakriti-muted font-mono mb-1 truncate">{expr}</p>}
        <p className="text-3xl font-bold text-prakriti-white font-mono truncate">{display}</p>
      </GlassCard>
      <div className="grid grid-cols-4 gap-2">
        {buttons.map((b, i) => (
          <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={b.a} className={`h-14 rounded-xl font-bold text-lg ${b.t === 'eq' ? 'bg-prakriti-pink text-white neon-pink-border' : 'bg-prakriti-card border border-prakriti-border text-prakriti-white'} ${b.c || ''}`}>{b.l}</motion.button>
        ))}
      </div>
    </div>
  )
}