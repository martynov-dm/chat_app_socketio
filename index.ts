import { ListenToSocketEndPoints } from './socket.io/socket.io'
import { MessageModel } from './models/message/message.model'
import { ServerModel } from './models/server/server.model'
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
import User from './models/user/user.model'

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

// const Message = new MessageModel({
//   text: 'test message from dimass',
//   user: '5fe86c42b7126c7c4be323e0',
// }).save()

// const getServerAndUpdate = async () => {
//   try {
//     const serverM = await ServerModel.findOne({
//       _id: '5feed3ed83c1690675c727eb',
//     })
//     const user = await User.findOne({ _id: '5fe98afea6431e1f81e8b5e0' })

//     const selectedRoom = serverM!.rooms.find(
//       (room) => room._id == '5feed3ed83c1690675c727ec'
//     )
//     selectedRoom!.history.push({
//       text: 'test message',
//       user: user?._id,
//     })
//     console.log(serverM)
//   } catch (err) {
//     console.log(err)
//   }
// }
// getServerAndUpdate()

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

ListenToSocketEndPoints(io)
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
