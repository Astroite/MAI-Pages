import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mai.pages.edgeone.ai',
  integrations: [react(), sitemap()],
  output: 'static',
});
