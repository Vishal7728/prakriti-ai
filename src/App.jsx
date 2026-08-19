import React, { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Header from './components/navigation/Header.jsx'
import BottomNavigation from './components/navigation/BottomNavigation.jsx'
import SideDrawer from './components/navigation/SideDrawer.jsx'
import IndianMotifBackground from './components/background/IndianMotifBackground.jsx'
import { useAppStore } from './app/stores.js'

import Welcome from './pages/Welcome.jsx'
import Home from './pages/Home.jsx'
import Speak from './pages/Speak.jsx'
import Gyan from './pages/Gyan.jsx'
import GyanCategory from './pages/GyanCategory.jsx'
import GyanTopic from './pages/GyanTopic.jsx'
import Tools from './pages/Tools.jsx'
import Profile from './pages/Profile.jsx'
import Settings from './pages/Settings.jsx'
import History from './pages/History.jsx'
import Saved from './pages/Saved.jsx'
import Support from './pages/Support.jsx'

import Calculator from './pages/tools/Calculator.jsx'
import MathSolver from './pages/tools/MathSolver.jsx'
import Notes from './pages/tools/Notes.jsx'
import Translator from './pages/tools/Translator.jsx'
import Writer from './pages/tools/Writer.jsx'
import ExtraTools from './pages/tools/ExtraTools.jsx'
import Scan from './pages/tools/Scan.jsx' // Added Scanner Import

function App() {
  const location = useLocation()
  const { isDrawerOpen, closeDrawer, setMode } = useAppStore()

  useEffect(() => { useAppStore.getState().initialize() }, [])

  useEffect(() => {
    const savedMode = localStorage.getItem('prakriti-mode')
    if (savedMode) setMode(savedMode)
  }, [setMode])

  useEffect(() => {
    if (isDrawerOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isDrawerOpen])

  useEffect(() => { closeDrawer() }, [location.pathname, closeDrawer])

  const isWelcomePage = location.pathname === '/' || location.pathname === '/welcome'
  const isVoicePage = location.pathname === '/speak'
  const showHeader = !isWelcomePage && !isVoicePage
  const showBottomNav = !isWelcomePage && !isVoicePage
  const welcomeDone = useAppStore((s) => s.hasCompletedWelcome)

  return (
    <div className="relative min-h-screen bg-prakriti-bg overflow-hidden">
      <IndianMotifBackground />
      {showHeader && <Header />}
      {showBottomNav && <BottomNavigation />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={welcomeDone ? <Navigate to="/home" replace /> : <Welcome />} />
          <Route path="/welcome" element={welcomeDone ? <Navigate to="/home" replace /> : <Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/speak" element={<Speak />} />
          <Route path="/gyan" element={<Gyan />} />
          <Route path="/gyan/:category" element={<GyanCategory />} />
          <Route path="/gyan/:category/:topic" element={<GyanTopic />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/calculator" element={<Calculator />} />
          <Route path="/tools/math" element={<MathSolver />} />
          <Route path="/tools/notes" element={<Notes />} />
          <Route path="/tools/translator" element={<Translator />} />
          <Route path="/tools/writer" element={<Writer />} />
          <Route path="/tools/scan" element={<Scan />} /> {/* Added Scanner Route */}
          <Route path="/tools/summary" element={<ExtraTools toolId="summary" />} />
          <Route path="/tools/pdf" element={<ExtraTools toolId="pdf" />} />
          <Route path="/tools/unit-converter" element={<ExtraTools toolId="unit-converter" />} />
          <Route path="/tools/code" element={<ExtraTools toolId="code" />} />
          <Route path="/tools/image-to-text" element={<ExtraTools toolId="image-to-text" />} />
          <Route path="/tools/voice-notes" element={<ExtraTools toolId="voice-notes" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<History />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </AnimatePresence>
      <SideDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
    </div>
  )
}

export default App