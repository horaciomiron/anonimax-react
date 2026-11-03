import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' = las rutas son relativas: la app funciona en Netlify, Vercel o GitHub Pages
export default defineConfig({
  base: './',
  plugins: [react()],
})
