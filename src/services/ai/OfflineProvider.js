/**
 * Offline AI Provider - connects to local AI model via Ollama
 * Ollama should be running at http://localhost:11434
 */
export class OfflineProvider {
  constructor() {
    this.baseUrl = import.meta.env.VITE_OFFLINE_AI_URL || 'http://localhost:11434'
    this.model = import.meta.env.VITE_OFFLINE_AI_MODEL || 'llama2'
  }

  async isAvailable() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`, {
        method: 'GET',
        signal: AbortSignal.timeout(3000),
      })
      return response.ok
    } catch (error) {
      return false
    }
  }

  async getModels() {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`)
      if (!response.ok) return []

      const data = await response.json()
      return data.models || []
    } catch (error) {
      return []
    }
  }

  async processQuery(query) {
    const available = await this.isAvailable()

    if (!available) {
      throw new Error('ऑफलाइन मॉडल उपलब्ध नहीं है। Ollama सेवा चल रही है?')
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
          prompt: `आप प्रकृति हैं - एक हिंदी भाषी AI सहायक। हिंदी में उत्तर दें।\n\nप्रश्न: ${query}\n\nउत्तर:`,
          stream: false,
          options: {
            temperature: 0.7,
            num_predict: 500,
          },
        }),
      })

      if (!response.ok) {
        throw new Error(`Ollama Error: ${response.status}`)
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error('Offline AI Error:', error)
      throw new Error('ऑफलाइन मॉडल से उत्तर प्राप्त नहीं हो सका।')
    }
  }
}