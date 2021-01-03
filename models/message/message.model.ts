import { IUser } from './../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  text: string
  user: IUser | string | null
}

export const MessageSchema = new Schema(
  {
    text: { type: String, required: true, max: 350 },
    user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
    room: { type: Schema.Types.ObjectId, ref: 'Room', require: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)
