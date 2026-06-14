import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      '0e61-103-156-118-11.ngrok-free.app'
    ]
  },
  plugins: [react()],
})
