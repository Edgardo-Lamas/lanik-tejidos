// @ts-check
import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import vercel from '@astrojs/vercel'

export default defineConfig({
  site: 'https://lanik-tejidos.vercel.app',
  output: 'server',
  adapter: vercel(),
  integrations: [sitemap()],
  devToolbar: { enabled: false },
})
