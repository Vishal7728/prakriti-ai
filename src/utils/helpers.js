export function formatTime(timestamp) {
  const date = new Date(timestamp); const now = new Date(); const diff = now - date
  if (diff < 60000) return 'अभी'
  if (diff < 3600000) return `${Math.floor(diff / 60000)} मिनट पहले`
  if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
  return date.toLocaleDateString('hi-IN', { day: '2-digit', month: 'short' })
}