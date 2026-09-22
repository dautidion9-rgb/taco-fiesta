import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    {
      // Vite adds crossorigin to the built script/stylesheet tags by default.
      // Everything here is same-origin, and some in-app browsers (e.g. Instagram's,
      // which proxies requests through Meta's own infra) don't forward CORS headers
      // cleanly, causing the crossorigin-flagged stylesheet to be silently dropped.
      name: 'strip-crossorigin',
      transformIndexHtml: {
        order: 'post',
        handler(html: string) {
          return html.replace(/<(?:script|link)\b[^>]*>/g, (tag) =>
            tag.includes('/assets/') ? tag.replace(/\s+crossorigin(="[^"]*")?/, '') : tag
          );
        },
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})