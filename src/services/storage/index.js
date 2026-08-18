import { openDB } from 'idb'

const DB_NAME = 'prakriti-ai'
const DB_VERSION = 1

let db = null

export async function initStorage() {
  try {
    db = await openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('conversations')) {
          db.createObjectStore('conversations', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('searches')) {
          db.createObjectStore('searches', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('savedAnswers')) {
          db.createObjectStore('savedAnswers', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('notes')) {
          db.createObjectStore('notes', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('voiceNotes')) {
          db.createObjectStore('voiceNotes', { keyPath: 'id' })
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' })
        }
      },
    })
    return db
  } catch (error) {
    console.warn('IndexedDB not available, falling back to localStorage')
    return null
  }
}

export async function saveData(storeName, data) {
  // Save to localStorage as fallback
  const key = `prakriti-${storeName}`
  const existing = JSON.parse(localStorage.getItem(key) || '[]')
  existing.unshift(data)
  localStorage.setItem(key, JSON.stringify(existing.slice(0, 100)))

  // Try IndexedDB
  if (db) {
    try {
      await db.put(storeName, data)
    } catch (e) {
      console.warn('IndexedDB save failed, using localStorage')
    }
  }

  return data
}

export async function getData(storeName, id) {
  if (db) {
    try {
      return await db.get(storeName, id)
    } catch (e) {
      // Fall through to localStorage
    }
  }

  const key = `prakriti-${storeName}`
  const data = JSON.parse(localStorage.getItem(key) || '[]')
  return data.find((item) => item.id === id)
}

export async function getAllData(storeName) {
  if (db) {
    try {
      return await db.getAll(storeName)
    } catch (e) {
      // Fall through to localStorage
    }
  }

  const key = `prakriti-${storeName}`
  return JSON.parse(localStorage.getItem(key) || '[]')
}

export async function deleteData(storeName, id) {
  // Delete from localStorage
  const key = `prakriti-${storeName}`
  const data = JSON.parse(localStorage.getItem(key) || '[]')
  const filtered = data.filter((item) => item.id !== id)
  localStorage.setItem(key, JSON.stringify(filtered))

  // Delete from IndexedDB
  if (db) {
    try {
      await db.delete(storeName, id)
    } catch (e) {
      // Ignore
    }
  }
}

export async function clearStore(storeName) {
  // Clear localStorage
  localStorage.removeItem(`prakriti-${storeName}`)

  // Clear IndexedDB
  if (db) {
    try {
      await db.clear(storeName)
    } catch (e) {
      // Ignore
    }
  }
}

export async function clearAllData() {
  const stores = ['conversations', 'searches', 'savedAnswers', 'notes', 'voiceNotes']
  for (const store of stores) {
    await clearStore(store)
  }
}