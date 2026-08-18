import { absolutePerfectAI } from './AbsolutePerfectAI.js'
export async function processQuery(query, mode = 'online') {
  try { return await absolutePerfectAI.processQuery(query, mode) } 
  catch (error) { return 'क्षमा करें, मैं अभी इस प्रश्न का उत्तर नहीं दे सकती।' }
}
export async function checkOfflineAvailability() { return true }