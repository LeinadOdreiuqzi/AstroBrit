import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://britanniamc.com',
  integrations: [sitemap()],
  vite: {
    build: {
      chunkSizeWarningLimit: 1200
    }
  }
});