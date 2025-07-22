import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// КОНФИГУРАЦИЯ БАЗОВОГО ПУТИ - МЕНЯЙТЕ ЗДЕСЬ
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/landing/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  server: {
    port: 4444,
    host: true
  }
})
