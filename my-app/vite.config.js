import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { createGenerateCoverHandler } from './server/generateCover.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    {
      name: 'local-ai-cover',
      configureServer(server) {
        const apiKey = loadEnv(mode, server.config.envDir, 'OPEN_API_KEY').OPEN_API_KEY?.trim()

        server.middlewares.use('/api/generate-cover', createGenerateCoverHandler(apiKey))
      },
    },
  ],
}))
