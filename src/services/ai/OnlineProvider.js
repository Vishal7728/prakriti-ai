/**
 * Online AI Provider - connects to external AI API
 * API key should be configured in .env file
 */
export class OnlineProvider {
  constructor() {
    this.apiUrl = import.meta.env.VITE_AI_API_URL || ''
    this.apiKey = import.meta.env.VITE_AI_API_KEY || ''
    this.model = import.meta.env.VITE_AI_MODEL || 'gpt-4'
  }

  async isAvailable() {
    // Check if we have an API key configured
    return !!this.apiKey || import.meta.env.VITE_AI_PROVIDER === 'mock'
  }

  async processQuery(query) {
    // If no API key, fall back to mock
    if (!this.apiKey) {
      const { MockAIProvider } = await import('./MockAIProvider.js')
      const mock = new MockAIProvider()
      return mock.processQuery(query)
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'system',
              content: 'आप प्रकृति हैं - एक हिंदी भाषी AI सहायक। आप भारतीय ज्ञान और संस्कृति का प्रतिनिधित्व करती हैं। हिंदी में उत्तर दें।',
            },
            {
              role: 'user',
              content: query,
            },
          ],
          temperature: 0.7,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`)
      }

      const data = await response.json()
      return data.choices[0].message.content
    } catch (error) {
      console.error('Online AI Error:', error)
      // Fall back to mock on error
      const { MockAIProvider } = await import('./MockAIProvider.js')
      const mock = new MockAIProvider()
      return mock.processQuery(query)
    }
  }
}