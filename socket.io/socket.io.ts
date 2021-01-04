import { MessageModel } from './../models/message/message.model'
import { RoomModel } from './../models/room/room.model'
import { Server, Socket } from 'socket.io'
import { ServerModel } from '../models/server/server.model'
import User from '../models/user/user.model'

export const ListenToSocketEndPoints = async (io: Server) => {
  const serversArr = await ServerModel.getServersArr()
  serversArr.forEach((server) => {
    io.of(server.endpoint).on('connection', async (socket: Socket) => {
      socket.emit('serversArr', serversArr)

      socket.on('joinServer', async (serverId) => {
        const currentServerData = await ServerModel.findOne(
          { _id: serverId },
          '_id title image endpoint isPrivate, rooms'
        )
          .populate({ path: 'rooms', select: 'roomTitle _id' })
          .lean()

        socket.emit('currentServerData', currentServerData)
      })

      socket.on('joinRoom', async (roomId: string) => {
        await socket.join(roomId)

        const currentRoomData = await RoomModel.findOne(
          {
            _id: roomId,
          },
          '_id currentUsers roomTitle userCount messages'
        ).populate({
          path: 'currentUsers',
          select: 'login avatar',
        })

        io.of(server.endpoint)
          .to(roomId)
          .emit('currentRoomDataUpdate', currentRoomData)
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
                socket.emit('savedMessage', savedAndPopulatedMessage)
            )
          )
        }
      )
    })
  })
}
