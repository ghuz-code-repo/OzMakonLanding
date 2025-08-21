import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// КОНФИГУРАЦИЯ БАЗОВОГО ПУТИ - МЕНЯЙТЕ ЗДЕСЬ
const BASE_PATH = process.env.NODE_ENV === 'production' ? '/' : '/'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: BASE_PATH,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
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
    port: 5173,
    host: true,
    cors: true
  },
  preview: {
    port: 80,
    host: true,
    cors: true,
    allowedHosts: ['oz-makon-business.gh.uz', 'localhost', '0.0.0.0']
  }
})
