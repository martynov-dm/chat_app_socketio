import { MessageSchema } from '../message/message.model'
import { IUser } from '../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { IMessage } from 'models/message/message.model'

export interface IRoom extends Document {
  isPrivate: boolean
  roomTitle: string
  history: string[]
  currentUsers: string[]
}

export const RoomSchema = new Schema({
  isPrivate: { type: Boolean, require: true },
  roomTitle: { type: String, require: true, max: 20, min: 1 },
  history: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  currentUsers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
})

export const RoomModel = mongoose.model<IRoom>('Room', RoomSchema)
