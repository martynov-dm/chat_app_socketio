//@ts-nocheck
import { ServerModel } from './models/server/server.model'
import express from 'express'
import { Server, Socket } from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import mongoose from 'mongoose'

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

// const DefaultServer = new ServerModel({
//   title: 'General',
//   image:
//     'https://res.cloudinary.com/martynov-dm/image/upload/c_crop,h_200,r_max,w_200,x_25,y_20/v1609480602/server_images/Default-Icon-icon_dlbq5a.png',
//   endpoint: '/general',
//   isPrivate: false,
//   rooms: [
//     {
//       isPrivate: false,
//       roomTitle: 'General',
//     },
//   ],
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
