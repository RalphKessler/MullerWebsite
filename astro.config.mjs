// @ts-check
import { defineConfig } from 'astro/config';

// Adresse der Website – für Test-Builds per Umgebungsvariable überschreibbar
const site = process.env.SITE_URL || 'https://demo.muller.ch';

export default defineConfig({
  site,
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
