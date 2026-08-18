export function speak(text, onEnd) {
  if (!('speechSynthesis' in window)) { if (onEnd) onEnd(); return }
  
  window.speechSynthesis.cancel() // Stop any ongoing speech

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'hi-IN'
  utterance.rate = parseFloat(localStorage.getItem('prakriti-voice-speed') || '1.0')
  utterance.volume = 1.0 // Force max volume for speakers

  // Ensure voices are loaded before speaking
  const setVoiceAndSpeak = () => {
    const voices = window.speechSynthesis.getVoices()
    const hindiVoice = voices.find((v) => v.lang.startsWith('hi'))
    if (hindiVoice) utterance.voice = hindiVoice
    
    utterance.onend = () => { if (onEnd) onEnd() }
    utterance.onerror = () => { if (onEnd) onEnd() }
    
    window.speechSynthesis.speak(utterance)
  }

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoiceAndSpeak()
  } else {
    window.speechSynthesis.onvoiceschanged = setVoiceAndSpeak
  }
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) window.speechSynthesis.cancel()
}