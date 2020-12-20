import express from 'express'
const socketio = require('socket.io')
import path from 'path'
import http from 'http'
import mainRouter from './routes/mainRoutes'

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(mainRouter)

io.on('connect', (socket: any) => {
  console.log('We have a new connection!!')

  socket.on('disconnect', () => {
    console.log('User had left')
  })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
