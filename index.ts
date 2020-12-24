import express from 'express'
import { Server, Socket } from 'socket.io'
import path from 'path'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

import authRoute from './routes/auth'
import { connect } from './services/mongoose'

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
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

connect()

app.use('/api/auth', authRoute)

io.on('connect', (socket: Socket) => {
  console.log('We have a new connection!!', socket)

  // socket.on('disconnect', () => {
  //   console.log('User had left')
  // })
})

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})
