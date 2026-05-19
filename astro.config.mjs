// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: 'https://edgardo-lamas.github.io/LaNik',
  integrations: [sitemap()],
  devToolbar: { enabled: false },
})
