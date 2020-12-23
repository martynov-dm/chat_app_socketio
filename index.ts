import express from 'express'
import { Server, Socket } from 'socket.io'
import path from 'path'
import http from 'http'
import mainRouter from './routes/mainRoutes'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 5000
const rooms = new Map()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.use(cors())
app.use(bodyParser.json())

app.use('/api', mainRouter)
app.use('/api/auth', auth)

io.on('connect', (socket: Socket) => {
  console.log('We have a new connection!!', socket)

  // socket.on('disconnect', () => {
  //   console.log('User had left')
  // })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
