class AbsolutePerfectAI {
  constructor() {
    this.memory = []
    this.knowledgeBase = {
      history: 'भारत का इतिहास प्राचीन काल से ही विश्व को ज्ञान देने वाला रहा है।',
      polity: 'भारतीय संविधान दुनिया का सबसे बड़ा लिखित संविधान है।',
    }
  }
  
  async processQuery(input, mode) {
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Store in memory
    this.memory.push({ query: input, timestamp: Date.now() })
    const lowerInput = input.toLowerCase()

    // Memory Recall Logic
    if (lowerInput.includes('पहले') || lowerInput.includes('याद है') || lowerInput.includes('what did i ask')) {
      if (this.memory.length > 1) {
        const lastQuery = this.memory[this.memory.length - 2].query
        return `हाँ, मुझे याद है। आपने पहले पूछा था: "${lastQuery}"। मैंने उस जानकारी को अपनी स्मृति में सुरक्षित रखा है।`
      }
      return `आपने पहले कोई विशेष प्रश्न नहीं पूछा है।`
    }

    if (lowerInput.includes('history') || lowerInput.includes('इतिहास')) return `✨ भारतीय इतिहास ✨\n\n${this.knowledgeBase.history}`
    if (lowerInput.includes('polity') || lowerInput.includes('राजव्यवस्था') || lowerInput.includes('संविधान')) return `✨ भारतीय राजव्यवस्था ✨\n\n${this.knowledgeBase.polity}`

    return `मैं प्रकृति हूँ। मैंने आपका प्रश्न "${input}" समझ लिया है और इसे अपनी स्मृति में संग्रहीत कर लिया है।`
  }
}
export const absolutePerfectAI = new AbsolutePerfectAI()