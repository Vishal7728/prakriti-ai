import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Essential for GitHub Pages to find assets correctly
  base: './', 
  
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // This fixes the "maximumFileSizeToCacheInBytes" error for large icons
      workbox: {
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MB limit
      },
      manifest: {
        name: 'PRAKRITI AI',
        short_name: 'PRAKRITI',
        description: 'आपकी साथी, आपकी सहायक, आपकी शक्ति।',
        theme_color: '#050609',
        background_color: '#050609',
        display: 'standalone',
        orientation: 'portrait',
        start_url: './',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  server: {
    host: true,
    port: 5173
  },
  
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'animation-vendor': ['framer-motion'],
          'math-vendor': ['mathjs']
        }
      }
    }
  }
})