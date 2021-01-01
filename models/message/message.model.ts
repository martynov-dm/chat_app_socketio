import { IUser } from './../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  text: string
  user: IUser | string | null
}

export const MessageSchema = new Schema(
  {
    text: { type: String, required: true, max: 255 },
    user: { type: Schema.Types.ObjectId, ref: 'Users', require: true },
  },
  {
    timestamps: true,
  }
)

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)
