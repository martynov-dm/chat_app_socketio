import { IUser } from './../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { IRoom } from '../room/room.model'

export interface IMessage extends Document {
  text: string
  room: IRoom | string
  date: Date
  user: IUser | string
}

export const MessageSchema = new Schema(
  {
    text: { type: String, required: true, max: 255 },
    room: { type: Schema.Types.ObjectId, ref: 'Room', require: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', require: true },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
)

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)
