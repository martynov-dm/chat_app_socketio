import express from 'express'
import { Server, Socket } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'

import authRoute from './routes/auth'
import { connect } from './services/mongoose'
import jwtStrategy from './services/passport'
import namespaces from './socket.io/data/data'

const PORT = process.env.PORT || 5000
const rooms = new Map()

const app = express()
const server = http.createServer(app)

app.use(cors())
passport.initialize()
passport.use('jwt', jwtStrategy)
app.use(bodyParser.json())
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
)
app.use(cookieParser())

connect()

app.use('/api/auth', authRoute)

server.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})

export const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (nsSocket: Socket) => {
    console.log(`${nsSocket.id} has joined ${namespace.endpoint}`)
    nsSocket.emit('nsRoomLoad', namespace.rooms)
  })
})

io.on('connection', (socket: Socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    }
  })

  socket.emit('nsList', nsData)
})
