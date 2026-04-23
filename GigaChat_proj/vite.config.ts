import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
        host: '0.0.0.0',
        port: 5000,
        allowedHosts: true,
        proxy: {
          '/api': {
                target: 'https://gigachat.devices.sberbank.ru',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, '/api')
          },
          '/auth': {
                target: 'https://ngw.devices.sberbank.ru:9443',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/auth/, '/api')
          }
        }
  }
})