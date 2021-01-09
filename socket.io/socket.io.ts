import { IUser } from './../models/user/user.types'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'

import { MessageModel } from './../models/message/message.model'
import { RoomModel } from './../models/room/room.model'
import { ServerModel } from '../models/server/server.model'
import User from '../models/user/user.model'
import options from '../config'

let userData: IUser
export const ListenToSocketEndPoints = async (io: Server) => {
  const serversArr = await ServerModel.getServersArr()

  io.of('/').on('connection', async (socket: Socket) => {
    socket.on('authenticate', async (token: string) => {
      try {
        const decodedData = await jwt.verify(token, options.jwtSecret as string)
        userData = await User.findById(
          //@ts-ignore
          decodedData._id,
          '_id login avatar currentRoomId currentServerEndpoint'
        ).lean()
        const initialData = {
          serversArr,
          userData,
        }
        // //@ts-ignore
        // socket['userData'] = userData
        // console.log(socket.id)

        socket.emit('authorized', initialData)
      } catch (error) {
        socket.emit('not authorized')
      }
    })
  })

  serversArr.forEach((server) => {
    io.of(server.endpoint).on('connection', async (socket: Socket) => {
      const currentServerDataFull = await ServerModel.findOne(
        { endpoint: server.endpoint },
        '_id title image endpoint isPrivate rooms'
      ).lean()
      const { rooms, ...serverData } = currentServerDataFull

      socket.emit('currentServerData', serverData)
      socket.emit('currentServerRoomsArr', rooms)

      socket.on('enterInitialRoom', async (roomId: string) => {
        // await leaveRoom(userId, io, server.endpoint, socket)
        //@ts-ignore
        socket['userData'] = userData
        joinRoom(userData._id, roomId, socket, server.endpoint, io)

        //  RoomModel.findByIdAndUpdate(roomId, {
        //   $addToSet: {
        //     currentUsers: userId,
        //   },
        // }).populate({
        //   path: 'currentUsers',
        //   select: 'login avatar',
        // })

        // io.of(server.endpoint).to(roomId).emit('userJoined', userData)
      })

      socket.on('changeRoom', async ({ oldRoomId, newRoomId }) => {
        // await leaveRoom(userId, io, server.endpoint, socket)
        joinRoom(userData._id, newRoomId, socket, server.endpoint, io)
        //@ts-ignore
        leaveRoom(userData._id, io, server.endpoint, socket)
      })

      socket.on(
        'newMessageToServer',
        async ({
          message,
          userId,
          roomId,
        }: {
          message: string
          userId: string
          roomId: string
        }) => {
          const newMessage = await new MessageModel({
            text: message,
            user: userId,
            room: roomId,
          })

          await newMessage.save((error, newMessageDoc) =>
            MessageModel.populate(
              newMessageDoc,
              { path: 'user', model: User },
              (err, savedAndPopulatedMessage) =>
                io
                  .of(server.endpoint)
                  .to(roomId)
                  .emit('savedMessage', savedAndPopulatedMessage)
            )
          )
        }
      )

      socket.on('disconnecting', (serverSocket: Socket) => {
        //@ts-ignore
        leaveRoom(socket.userId, io, server.endpoint, socket)
      })
    })
  })
}

const leaveRoom = async (
  userId: string,
  oldRoomId: string,
  io: Server,
  endpoint: string,
  socket: Socket
) => {
  await socket.leave(oldRoomId.toString())

  const roomData = await RoomModel.findById(userData!.currentRoomId)
    .populate({
      path: 'users',
    })
    .lean()

  const list = await io.of(endpoint).in(oldRoomId).sockets
  //@ts-ignore
  const users = Array.from(list.values()).map((item) => item.userData)

  await io
    .of(endpoint)
    .to(userData.currentRoomId.toString())
    .emit('usersUpdate', users)
}

const joinRoom = async (
  userId: string,
  roomId: string,
  socket: Socket,
  endpoint: string,
  io: Server
) => {
  const roomDataFull = await RoomModel.findById(roomId)
    .populate({
      path: 'messages',
    })
    .lean()
  const { messages, ...roomData } = roomDataFull

  await socket.emit('currentRoomData', roomData)
  await socket.emit('currentRoomMessages', messages)

  await socket.join(roomId.toString())

  const list = await io.of(endpoint).in(roomId).sockets
  //@ts-ignore
  const users = Array.from(list.values()).map((item) => item.userData)

  await socket.emit('usersUpdate', users)
  await socket.to(roomId).emit('usersUpdate', users)

  userData = (await User.findByIdAndUpdate(userId, {
    $set: { currentRoomId: roomId },
  })) as IUser
}
