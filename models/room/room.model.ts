import { MessageSchema } from '../message/message.model'
import { IUser } from '../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { IMessage } from 'models/message/message.model'

export interface IRoom extends Document {
  namespace: string
  isPrivate: boolean
  roomTitle: string
  history: IMessage[]
}

export const RoomSchema = new Schema(
  {
    isPrivate: { type: Boolean, require: true },
    roomTitle: { type: String, require: true, max: 20, min: 1 },
    history: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  {
    timestamps: true,
  }
)

export const RoomModel = mongoose.model<IRoom>('Room', RoomSchema)
