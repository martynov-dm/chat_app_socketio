import express from 'express'
import { Server, Socket } from 'socket.io'
import path from 'path'
import http from 'http'
import mainRouter from './routes/mainRoutes'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(mainRouter)

io.on('connect', (socket: Socket) => {
  console.log('We have a new connection!!')

  socket.on('disconnect', () => {
    console.log('User had left')
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
