import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3333,
    strictPort: true, // Exit if port is already in use
    open: true, // Attempt to open in browser automatically
  },
})
