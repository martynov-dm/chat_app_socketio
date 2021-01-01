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
  cookie: false,
  serveClient: false,
  cors: {
    origin: '*',
  },
})

namespaces.forEach((namespace) => {
  io.of(namespace.endpoint).on('connection', (nsSocket: Socket) => {
    nsSocket.emit('nsRoomLoad', namespace.rooms)

    nsSocket.on('joinRoom', async (roomToJoin) => {
      const roomToLeave = Array.from(nsSocket.rooms)[1]

      nsSocket.leave(roomToLeave)
      updateUsersInRoom(namespace, roomToJoin)

      await nsSocket.join(roomToJoin)

      const nsRoom = await namespace.rooms.find((room) => {
        return room.roomTitle === roomToJoin
      })

      await nsSocket.emit('historyCatchUp', nsRoom.history)
      updateUsersInRoom(namespace, roomToJoin)
    })

    nsSocket.on('newMessageToServer', (msg) => {
      const fullMsg = {
        text: msg,
        time: Date.now(),
        username: 'dimes',
        avatar: 'http://via.placeholder.com/30',
      }

      const roomTitle = Array.from(nsSocket.rooms)[1]

      const nsRoom = namespace.rooms.find((room) => {
        return room.roomTitle === roomTitle
      })
      nsRoom.addMessage(fullMsg)
      console.log(nsRoom)

      io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
    })
  })
})

io.of('/').on('connection', (socket: Socket) => {
  const nsData = namespaces.map((ns) => {
    return {
      img: ns.img,
      endpoint: ns.endpoint,
    }
  })

  socket.emit('nsList', nsData)
})

const updateUsersInRoom = async (namespace: any, roomToJoin: string) => {
  const clientsCount = await (
    await io.of(namespace.endpoint).in(roomToJoin).allSockets()
  ).size

  io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clientsCount)
}
