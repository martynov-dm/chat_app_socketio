import { UserModel } from 'models/user/user.types'
import mongoose, { Schema } from 'mongoose'
import { RoomSchema } from './../room/room.model'
import { IServer, IServerModel } from './server.types'

export const ServerSchema: Schema = new Schema({
  title: { type: String, required: true, max: 15, min: 1, unique: true },
  image: { type: String, required: true, min: 1 },
  endpoint: { type: String, required: true, unique: true, min: 1, max: 20 },
  isPrivate: { type: Boolean, require: true },

  rooms: [RoomSchema],
})

ServerSchema.statics.getServersArr = async function (): Promise<IServer[]> {
  const serversList = await this.find().lean().exec()

  return serversList
}

export const ServerModel = mongoose.model<IServer, IServerModel>(
  'Server',
  ServerSchema
)
