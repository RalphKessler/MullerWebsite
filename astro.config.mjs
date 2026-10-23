// @ts-check
import { defineConfig } from 'astro/config';

// Adresse der Website – für Test-Builds per Umgebungsvariable überschreibbar
const site = process.env.SITE_URL || 'https://demo.muller.ch';
// Unterpfad, z. B. «/MullerWebsite» für GitHub Pages (sonst leer)
const base = process.env.BASE_PATH || undefined;

export default defineConfig({
  site,
  base,
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  i18n: {
    locales: ['de'],
    defaultLocale: 'de',
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
