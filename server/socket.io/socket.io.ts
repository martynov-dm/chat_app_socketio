import { SocketWithUserData, IDecodedData } from './../types'
import { IServer, IServerWithRooms } from './../models/server/server.types'
import { IUser } from './../models/user/user.types'
import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'

import { MessageModel } from './../models/message/message.model'
import {
  IRoom,
  RoomModel,
  IRoomWithMessages,
} from './../models/room/room.model'
import { ServerModel } from '../models/server/server.model'
import User from '../models/user/user.model'
import options from '../config'

let userData: IUser = {} as IUser

export const ListenToSocketEndPoints = async (io: Server) => {
  const serversArr = await ServerModel.getServersArr()

  io.of('/').on('connection', async (socket: Socket) => {
    socket.on('authenticate', async (token: string) => {
      try {
        const decodedData = await jwt.verify(token, options.jwtSecret as string)

        userData = await User.findById(
          (decodedData as IDecodedData)._id,
          '_id login avatar currentRoomId currentServerEndpoint'
        ).lean()

        const initialData = {
          serversArr,
          userData,
        }

        socket.emit('authorized', initialData)
      } catch (error) {
        socket.emit('not authorized')
      }
    })
  })

  serversArr.forEach((server) => {
    io.of(server.endpoint).on(
      'connection',
      async (socket: SocketWithUserData) => {
        const currentServerDataFull: IServerWithRooms = await ServerModel.findOne(
          { endpoint: server.endpoint },
          '_id title image endpoint type rooms'
        ).lean()
        const { rooms, ...serverData } = currentServerDataFull

        socket.emit('currentServerData', serverData)
        socket.emit('currentServerRoomsArr', rooms)

        await User.findByIdAndUpdate(
          userData._id,
          {
            $set: { currentServerEndpoint: server.endpoint },
          },
          { new: true },

          (err, user) => (userData = user as IUser)
        )

        socket['userData'] = userData

        if (
          rooms.some((room: IRoom) => {
            JSON.stringify(room._id) == JSON.stringify(userData.currentRoomId)
          })
        ) {
          const initialRoomId = userData.currentRoomId

          joinRoom(userData._id, initialRoomId, socket, server.endpoint, io)
        } else {
          const initialRoomId = rooms[0]._id

          joinRoom(userData._id, initialRoomId, socket, server.endpoint, io)
        }

        socket.on('changeRoom', async (newRoomId: string) => {
          const currentRoomId = userData.currentRoomId
          joinRoom(userData._id, newRoomId, socket, server.endpoint, io)
          leaveRoom(currentRoomId, io, server.endpoint, socket)
        })

        socket.on('addRoom', async (newRoomTitle: string) => {
          const newRoom = new RoomModel({
            roomTitle: newRoomTitle,
            server: server._id,
          })
          newRoom.save((err, doc) => {
            io.of(server.endpoint).emit('addRoom', doc)
          })
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

        socket.on('disconnect', async () => {
          const SocketsInRoomArr = Array.from(
            (
              await io
                .of(server.endpoint)
                .in(userData.currentRoomId.toString())
                .allSockets()
            ).values()
          )

          const usersArr = SocketsInRoomArr.map(
            (socket) =>
              (io.of(server.endpoint).sockets.get(socket) as SocketWithUserData)
                .userData
          )

          const filteredUsersArr = usersArr.filter(
            (user, index, thisArray) =>
              thisArray.findIndex((user2) => user2.login === user.login) ===
              index
          )

          await io
            .of(server.endpoint)
            .in(userData.currentRoomId.toString())
            .emit('usersUpdate', filteredUsersArr)
        })
      }
    )
  })
}

const leaveRoom = async (
  oldRoomId: string,
  io: Server,
  endpoint: string,
  socket: Socket
) => {
  await socket.leave(oldRoomId.toString())

  const SocketsInRoomArr = Array.from(
    (await io.of(endpoint).in(oldRoomId.toString()).allSockets()).values()
  )

  const usersArr = SocketsInRoomArr.map(
    (socket) =>
      (io.of(endpoint).sockets.get(socket) as SocketWithUserData).userData
  )

  const filteredUsersArr = usersArr.filter(
    (user, index, thisArray) =>
      thisArray.findIndex((user2) => user2.login === user.login) === index
  )

  await io
    .of(endpoint)
    .to(userData.currentRoomId.toString())
    .emit('usersUpdate', filteredUsersArr)
}

const joinRoom = async (
  userId: string,
  roomId: string,
  socket: Socket,
  endpoint: string,
  io: Server
) => {
  const roomDataFull: IRoomWithMessages = await RoomModel.findById(roomId)
    .populate({
      path: 'messages',
    })
    .lean()
  const { messages, ...roomData } = roomDataFull

  await socket.emit('currentRoomData', roomData)

  await socket.emit('currentRoomMessages', messages)

  await socket.join(roomId.toString())

  const SocketsInRoomArr = Array.from(
    (await io.of(endpoint).in(roomId.toString()).allSockets()).values()
  )

  const usersArr = SocketsInRoomArr.map(
    (socket) =>
      (io.of(endpoint).sockets.get(socket) as SocketWithUserData).userData
  )

  const filteredUsersArr = usersArr.filter(
    (user, index, thisArray) =>
      thisArray.findIndex((user2) => user2.login === user.login) === index
  )

  await socket.emit('usersUpdate', filteredUsersArr)
  await socket.to(roomId.toString()).emit('usersUpdate', filteredUsersArr)

  await User.findByIdAndUpdate(
    userId,
    {
      $set: { currentRoomId: roomId },
    },
    { new: true },
    (err, user) => {
      userData = user as IUser
    }
  )
}
