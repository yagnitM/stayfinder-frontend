import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        //target: 'http://localhost:5000', //dev
        target: 'https://stayfinder-backend-ri8p.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})