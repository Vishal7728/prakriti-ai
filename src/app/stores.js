import { create } from 'zustand'

export const useAppStore = create((set, get) => ({
  mode: 'online', isDrawerOpen: false, language: 'hi', theme: 'dark', hasCompletedWelcome: false,
  setMode: (mode) => { localStorage.setItem('prakriti-mode', mode); set({ mode }) },
  toggleMode: () => { const newMode = get().mode === 'online' ? 'offline' : 'online'; localStorage.setItem('prakriti-mode', newMode); set({ mode: newMode }) },
  openDrawer: () => set({ isDrawerOpen: true }),
  closeDrawer: () => set({ isDrawerOpen: false }),
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  setLanguage: (language) => { localStorage.setItem('prakriti-language', language); set({ language }) },
  setTheme: (theme) => { localStorage.setItem('prakriti-theme', theme); if (theme === 'light') document.documentElement.classList.remove('dark'); else document.documentElement.classList.add('dark'); set({ theme }) },
  completeWelcome: () => { localStorage.setItem('prakriti-welcome-complete', 'true'); set({ hasCompletedWelcome: true }) },
  initialize: () => {
    const savedTheme = localStorage.getItem('prakriti-theme') || 'dark'
    if (savedTheme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
    set({ mode: localStorage.getItem('prakriti-mode') || 'online', language: localStorage.getItem('prakriti-language') || 'hi', theme: savedTheme, hasCompletedWelcome: localStorage.getItem('prakriti-welcome-complete') === 'true' })
  },
}))

export const useAIStore = create((set) => ({
  onlineProvider: 'mock', offlineModel: null,
  setOnlineProvider: (provider) => set({ onlineProvider: provider }),
  setOfflineModel: (model) => set({ offlineModel: model }),
}))

export const useVoiceStore = create((set) => ({
  voiceState: 'idle', transcript: '', response: '', isListening: false, isSpeaking: false,
  voiceEnabled: true, voiceSpeed: 1.0, autoSpeak: true, selectedVoice: null, availableVoices: [],
  setVoiceState: (voiceState) => set({ voiceState }),
  setTranscript: (transcript) => set({ transcript }),
  setResponse: (response) => set({ response }),
  setListening: (isListening) => set({ isListening }),
  setSpeaking: (isSpeaking) => set({ isSpeaking }),
  setVoiceEnabled: (enabled) => set({ voiceEnabled: enabled }),
  setVoiceSpeed: (speed) => set({ voiceSpeed: speed }),
  setAutoSpeak: (autoSpeak) => set({ autoSpeak }),
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  setAvailableVoices: (voices) => set({ availableVoices: voices }),
  reset: () => set({ voiceState: 'idle', transcript: '', response: '', isListening: false, isSpeaking: false }),
}))

export const useChatStore = create((set, get) => ({
  searchHistory: [],
  addSearch: (query) => { const search = { id: Date.now(), query, timestamp: Date.now() }; set({ searchHistory: [search, ...get().searchHistory].slice(0, 50) }); return search },
  setSearchHistory: (searchHistory) => set({ searchHistory }),
}))

export const useSettingsStore = create((set) => ({
  animations: true,
  setAnimations: (animations) => set({ animations }),
  clearAllData: () => { localStorage.clear(); window.location.reload() },
}))

export const useSavedStore = create((set, get) => ({
  savedAnswers: [],
  addSavedAnswer: (answer) => set({ savedAnswers: [answer, ...get().savedAnswers] }),
  deleteSavedAnswer: (id) => set({ savedAnswers: get().savedAnswers.filter((a) => a.id !== id) }),
  setSavedAnswers: (savedAnswers) => set({ savedAnswers }),
  initialize: () => { const saved = localStorage.getItem('prakriti-saved-answers'); if (saved) { try { set({ savedAnswers: JSON.parse(saved) }) } catch (e) { set({ savedAnswers: [] }) } } },
}))

export const useNotesStore = create((set, get) => ({
  notes: [],
  addNote: (note) => set({ notes: [note, ...get().notes] }),
  updateNote: (id, updates) => set({ notes: get().notes.map((n) => (n.id === id ? { ...n, ...updates } : n)) }),
  deleteNote: (id) => set({ notes: get().notes.filter((n) => n.id !== id) }),
  setNotes: (notes) => set({ notes }),
  initialize: () => { const saved = localStorage.getItem('prakriti-notes'); if (saved) { try { set({ notes: JSON.parse(saved) }) } catch (e) { set({ notes: [] }) } } },
}))