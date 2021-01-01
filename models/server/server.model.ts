import { RoomSchema } from './../room/room.model'
import mongoose, { Schema, Document } from 'mongoose'
import { IRoom } from '../room/room.model'

export interface IServer extends Document {
  title: string
  image: string
  endpoint: string
  rooms: IRoom[]
}

export const ServerSchema = new Schema(
  {
    title: { type: String, required: true, max: 15, min: 1, unique: true },
    image: { type: String, required: true, min: 1 },
    endpoint: { type: String, required: true, unique: true, min: 1, max: 20 },
    isPrivate: { type: Boolean, require: true },

    rooms: [RoomSchema],
  },
  {
    timestamps: true,
  }
)

ServerSchema.statics.getServersArr = async function (): Promise<IServer[]> {
  const serversList = await this.find().lean().exec()

  return serversList
}

export const ServerModel = mongoose.model<IServer>('Server', ServerSchema)
