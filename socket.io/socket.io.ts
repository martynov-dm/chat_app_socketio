import { Server, Socket } from 'socket.io'
import jwt from 'jsonwebtoken'

import { MessageModel } from './../models/message/message.model'
import { RoomModel } from './../models/room/room.model'
import { ServerModel } from '../models/server/server.model'
import User from '../models/user/user.model'
import options from '../config'

export const ListenToSocketEndPoints = async (io: Server) => {
  const serversArr = await ServerModel.getServersArr()
  serversArr.forEach((server) => {
    io.of(server.endpoint).on('connection', async (socket: Socket) => {
      socket.on('authenticate', async (token) => {
        try {
          const decodedData = await jwt.verify(
            token,
            options.jwtSecret as string
          )
          const userData = await User.findById(
            //@ts-ignore
            decodedData._id,
            '_id login avatar room'
          ).lean()
          console.log(userData)
          const initialData = {
            serversArr,
            userData,
          }
          socket.emit('authorized', initialData)
        } catch (error) {
          socket.emit('not authorized')
        }
      })

      socket.on('joinServer', async (serverId) => {
        const currentServerData = await ServerModel.findById(
          serverId,
          '_id title image endpoint isPrivate, rooms'
        ).lean()

        socket.emit('currentServerData', currentServerData)
      })

      socket.on(
        'joinRoom',
        async ({ roomId, userId }: { roomId: string; userId: string }) => {
          const userData = await User.findById(userId).lean()

          if (userData!.room) {
            await socket.leave(userData!.room)
            await User.findByIdAndUpdate(userId, {
              $unset: { room: '' },
            })

            const roomData = await RoomModel.findById(roomId)
              .populate({
                path: 'users',
              })
              .lean()

            io.of(server.endpoint)
              .to(userData!.room)
              .emit('usersUpdate', roomData.users)
          }

          await socket.join(roomId)

          await User.findByIdAndUpdate(userId, {
            $set: { room: roomId },
          })

          const roomData = await RoomModel.findById(roomId)
            .populate({
              path: 'messages',
            })
            .populate({
              path: 'users',
            })
            .lean()

          socket.emit('currentRoomData', roomData)
          socket.to(roomId).emit('usersUpdate', roomData.users)
          //  RoomModel.findByIdAndUpdate(roomId, {
          //   $addToSet: {
          //     currentUsers: userId,
          //   },
          // }).populate({
          //   path: 'currentUsers',
          //   select: 'login avatar',
          // })

          // io.of(server.endpoint).to(roomId).emit('userJoined', userData)
        }
      )

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
    })
  })
}
