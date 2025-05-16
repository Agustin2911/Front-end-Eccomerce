import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
    watch: {
      // activa polling en lugar de inotify
      usePolling: true,
      // cada cuánto (en ms) mira cambios
      interval: 100,
    }
  }
})
