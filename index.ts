import express from 'express'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import jwt from 'jsonwebtoken'

import { ListenToSocketEndPoints } from './socket.io/socket.io'
import authRoute from './routes/auth'
import { connect } from './services/mongoose'
import jwtStrategy from './services/passport'
import { Handshake } from 'socket.io/dist/socket'
import options from './config'

const PORT = process.env.PORT || 5000

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

// {
//   text: { type: String, required: true, max: 255 },
//   user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
// },

// console.log(testServer)

// save model to database
// DefaultServer.save(function (err: any, server) {
//   if (err) return console.error(err)
//   console.log(server + ' saved to bookstore collection.')
// })

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

// io.use((socket, next) => {
//   //@ts-ignore
//   if (socket.handshake.query && socket.handshake.query.token) {
//     jwt.verify(
//       //@ts-ignore
//       socket.handshake.query.token,
//       //@ts-ignore
//       options.jwtSecret,
//       function (err: any, decoded: any) {
//         if (err) return next(new Error('Authentication error'))
//         //@ts-ignore
//         socket.decoded = decoded
//         next()
//       }
//     )
//   } else {
//     console.log('no auth')

//     next(new Error('Authentication error'))
//   }
// })

ListenToSocketEndPoints(io)
// const Add = async () => {
//   try {
//     const Message = new MessageModel({
//       text: 'test message 2 room 1 server 2',
//       user: '5fe8c8ed69235e35040adeb7',
//       room: '5ff17230c48c28556231c2e8',
//     })
//     Message.save()
//   } catch (err) {
//     console.log(err)
//   }
// }
// Add()

// const servers = ServerSchema.getServersArr().then((docs) => console.log(docs))

// namespaces.forEach((namespace) => {
//   io.of(namespace.endpoint).on('connection', (nsSocket: Socket) => {
//     nsSocket.emit('nsRoomLoad', namespace.rooms)

//     nsSocket.on('joinRoom', async (roomToJoin) => {
//       const roomToLeave = Array.from(nsSocket.rooms)[1]

//       nsSocket.leave(roomToLeave)
//       updateUsersInRoom(namespace, roomToJoin)

//       await nsSocket.join(roomToJoin)

//       const nsRoom = await namespace.rooms.find((room) => {
//         return room.roomTitle === roomToJoin
//       })

//       await nsSocket.emit('historyCatchUp', nsRoom.history)
//       updateUsersInRoom(namespace, roomToJoin)
//     })

//     nsSocket.on('newMessageToServer', (msg) => {
//       const fullMsg = {
//         text: msg,
//         time: Date.now(),
//         username: 'dimes',
//         avatar: 'http://via.placeholder.com/30',
//       }

//       const roomTitle = Array.from(nsSocket.rooms)[1]

//       const nsRoom = namespace.rooms.find((room) => {
//         return room.roomTitle === roomTitle
//       })
//       nsRoom.addMessage(fullMsg)
//       console.log(nsRoom)

//       io.of(namespace.endpoint).to(roomTitle).emit('messageToClients', fullMsg)
//     })
//   })
// })

// const updateUsersInRoom = async (namespace: any, roomToJoin: string) => {
//   const clientsCount = await (
//     await io.of(namespace.endpoint).in(roomToJoin).allSockets()
//   ).size

//   io.of(namespace.endpoint).in(roomToJoin).emit('updateMembers', clientsCount)
// }
