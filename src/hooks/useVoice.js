import { useCallback, useEffect, useRef } from 'react'
import { useVoiceStore } from '../app/stores.js'
import { startListening, stopListening, isSpeechRecognitionSupported } from '../services/voice/speechToText.js'
import { speak, stopSpeaking, getAvailableVoices } from '../services/voice/textToSpeech.js'

export function useVoice() {
  const store = useVoiceStore()
  const supported = useRef(isSpeechRecognitionSupported())

  useEffect(() => {
    // Load voices when available
    if ('speechSynthesis' in window) {
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices()
        store.setAvailableVoices(voices)

        const savedName = localStorage.getItem('prakriti-selected-voice')
        const saved = voices.find((v) => v.name === savedName)
        const hindi = voices.find((v) => v.lang.startsWith('hi'))

        if (saved) {
          store.setSelectedVoice(saved)
        } else if (hindi) {
          store.setSelectedVoice(hindi)
        }
      }

      loadVoices()
      window.speechSynthesis.onvoiceschanged = loadVoices
    }
  }, [])

  const listen = useCallback(() => {
    if (!supported.current) {
      store.setVoiceState('error')
      return
    }

    if (store.voiceState === 'listening') {
      stopListening()
      store.setVoiceState('idle')
      return
    }

    store.setVoiceState('listening')
    startListening(
      (interim) => store.setTranscript(interim),
      (final) => {
        store.setTranscript(final)
        store.setVoiceState('idle')
      },
      (error) => {
        store.setVoiceState('error')
      }
    )
  }, [store])

  const stop = useCallback(() => {
    stopListening()
    stopSpeaking()
    store.setVoiceState('idle')
  }, [store])

  const speakText = useCallback((text, onEnd) => {
    store.setVoiceState('speaking')
    speak(text, () => {
      store.setVoiceState('idle')
      if (onEnd) onEnd()
    })
  }, [store])

  const stopSpeaking_ = useCallback(() => {
    stopSpeaking()
    store.setVoiceState('idle')
  }, [store])

  return {
    listen,
    stop,
    speak: speakText,
    stopSpeaking: stopSpeaking_,
    supported: supported.current,
  }
}