import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'vite',
  publicDir: '../public',
  build: {
    outDir: '../dist',
  },
  server: {
    proxy: {
      /* Redirect to Rust backend */
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
