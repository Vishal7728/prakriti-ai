let recognition = null

export function isSpeechRecognitionSupported() {
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition)
}

export function startListening(onInterim, onFinal, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SpeechRecognition) { onError('आपका ब्राउज़र वॉइस रिकग्निशन सपोर्ट नहीं करता।'); return }

  recognition = new SpeechRecognition()
  recognition.lang = 'hi-IN'
  recognition.continuous = true // Prevents auto-stop
  recognition.interimResults = true

  recognition.onresult = (event) => {
    let interimText = '', finalText = ''
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) finalText += transcript
      else interimText += transcript
    }
    if (interimText) onInterim(interimText)
    if (finalText) onFinal(finalText)
  }

  recognition.onerror = (event) => {
    if (event.error === 'not-allowed') onError('माइक्रोफोन की अनुमति आवश्यक है।')
    else if (event.error === 'no-speech') onError('कोई आवाज़ नहीं सुनाई दी।')
    else onError('आवाज़ पहचानने में समस्या।')
  }

  try { recognition.start() } catch (error) { onError('माइक्रोफोन शुरू नहीं हो सका।') }
}

export function stopListening() {
  if (recognition) { recognition.stop(); recognition = null }
}