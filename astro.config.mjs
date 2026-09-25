import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://britanniamc.com',
  vite: {
    build: {
      chunkSizeWarningLimit: 1200
    }
  }
});