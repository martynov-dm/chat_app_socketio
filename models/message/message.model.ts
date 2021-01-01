import { IUser } from './../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  text: string
  date?: Date
  user: IUser | string | null
}

export const MessageSchema = new Schema(
  {
    text: { type: String, required: true, max: 255 },
    user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
    date: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)
