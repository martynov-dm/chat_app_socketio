import { MessageModel } from './../message/message.model'
import User from '../user/user.model'
import mongoose, { Schema } from 'mongoose'
import { RoomModel, RoomSchema } from './../room/room.model'
import { IServer, IServerModel } from './server.types'

export const ServerSchema: Schema = new Schema(
  {
    title: { type: String, required: true, max: 15, min: 1, unique: true },
    image: { type: String, required: true, min: 1 },
    endpoint: { type: String, required: true, unique: true, min: 1, max: 20 },
    isPrivate: { type: Boolean, require: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

ServerSchema.virtual('rooms', {
  ref: RoomModel,
  localField: '_id',
  foreignField: 'server',
  options: { select: '-__v' },
})

ServerSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'rooms',
  })

  next()
})

ServerSchema.statics.getServersArr = async function (): Promise<IServer[]> {
  const serversList = await this.find({}, '_id title image endpoint isPrivate')
    .lean()
    .exec()

  return serversList
}

// ServerSchema.statics.findAndPopulateCurrentServer = async function (
//   endpoint: string
// ): Promise<IServer> {
//   const currentServer = await this.findOne({ endpoint })
//     .populate({
//       path: 'rooms',
//       populate: {
//         path: 'history',
//         model: MessageModel,
//         populate: {
//           path: 'user',
//           model: User,
//         },
//       },
//     })
//     .lean()
//     .exec()

//   // console.log(currentServer.rooms[2].history)

//   // currentServer.rooms[0].history.populate().exec()

//   return currentServer
// }

ServerSchema.statics.getEndpoints = async function (): Promise<string[]> {
  const serversList = await this.find().lean().exec()

  return serversList.map((server: IServer) => server.endpoint)
}

export const ServerModel = mongoose.model<IServer, IServerModel>(
  'Server',
  ServerSchema
)
