import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id)

  socket.on('new-order', (order) => {
    console.log('New Order:', order)
    io.emit('new-order', order)
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id)
  })
})

const PORT = 3000
server.listen(PORT, () => {
  console.log(`WebSocket server running at http://localhost:${PORT}`)
})
