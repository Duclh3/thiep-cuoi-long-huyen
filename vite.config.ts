import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'

const wishesFilePath = path.resolve(__dirname, 'data/wishes.json')

export default defineConfig(({ command }) => ({
  base: process.env.VERCEL ? '/' : command === 'build' ? '/thiep-cuoi-long-huyen/' : '/',
  server: {
    watch: {
      // Ngăn Vite tự động reload lại trang khi lưu lời chúc vào thư mục data/
      ignored: ['**/data/**', '**/data/wishes.json'],
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'wedding-wishes-persistence-api',
      configureServer(server) {
        // Bỏ theo dõi file wishes.json khỏi Chokidar watcher của Vite
        server.watcher.unwatch(wishesFilePath)
        server.watcher.unwatch(path.dirname(wishesFilePath))

        server.middlewares.use('/api/wishes', (req, res) => {
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          if (req.method === 'GET') {
            try {
              const raw = fs.existsSync(wishesFilePath)
                ? fs.readFileSync(wishesFilePath, 'utf-8')
                : '[]'
              res.statusCode = 200
              res.end(raw)
            } catch {
              res.statusCode = 200
              res.end('[]')
            }
            return
          }

          if (req.method === 'POST') {
            let body = ''
            req.on('data', (chunk) => {
              body += chunk.toString()
            })
            req.on('end', () => {
              try {
                const newWish = JSON.parse(body)
                const current = fs.existsSync(wishesFilePath)
                  ? JSON.parse(fs.readFileSync(wishesFilePath, 'utf-8'))
                  : []
                const updated = [newWish, ...current]
                fs.mkdirSync(path.dirname(wishesFilePath), { recursive: true })
                fs.writeFileSync(wishesFilePath, JSON.stringify(updated, null, 2), 'utf-8')
                res.statusCode = 200
                res.end(JSON.stringify(updated))
              } catch {
                res.statusCode = 400
                res.end(JSON.stringify({ error: 'Invalid wish payload' }))
              }
            })
            return
          }

          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
        })
      },
    },
  ],
}))
