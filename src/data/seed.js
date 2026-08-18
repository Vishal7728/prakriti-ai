// src/data/seed.js

// Initial seed data for first launch
export const SEED_SEARCHES = [
  { id: 'seed_1', query: 'भारत का इतिहास क्या है?', timestamp: Date.now() - 3600000, mode: 'online' },
  { id: 'seed_2', query: 'पानी का रासायनिक सूत्र', timestamp: Date.now() - 7200000, mode: 'online' },
  { id: 'seed_3', query: 'योग के फायदे', timestamp: Date.now() - 86400000, mode: 'offline' },
  { id: 'seed_4', query: 'AI क्या है?', timestamp: Date.now() - 90000000, mode: 'online' },
]

export const SEED_TRENDING = [
  { id: 't1', label: 'भारतीय इतिहास', icon: '📜', path: '/gyan/history' },
  { id: 't2', label: 'विज्ञान', icon: '🔬', path: '/gyan/science' },
  { id: 't3', label: 'प्रौद्योगिकी', icon: '💻', path: '/gyan/technology' },
  { id: 't4', label: 'स्वास्थ्य', icon: '🧘', path: '/gyan/health' },
]