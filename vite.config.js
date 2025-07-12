import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   // Все запросы, начинающиеся с /api, будут перенаправляться
    //   '/api': {
    //     target: 'https://api.macroserver.ru', // Адрес реального сервера MACRO
    //     changeOrigin: true,                   // ОБЯЗАТЕЛЬНО: это подменяет Origin
    //     rewrite: (path) => path.replace(/^\/api/, ''), // Убираем /api из пути запроса
    //   }
    // },
    // host: 'localhost', // Use your domain or 'localhost' for local development
    port: 4444,
    strictPort: true, // Exit if port is already in use
    open: true, // Attempt to open in browser automatically
  },
})
