import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom' // Changed to HashRouter
import App from './App.jsx'
import './index.css'

const savedTheme = localStorage.getItem('prakriti-theme') || 'dark'
if (savedTheme === 'dark') document.documentElement.classList.add('dark')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
)