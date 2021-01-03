import { IRoom } from './../room/room.model'
import { IUser } from './../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'

export interface IMessage extends Document {
  text: string
  user: IUser | string | null
  room: IRoom | string | null
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

MessageSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'login avatar',
  })
  next()
})

export const MessageModel = mongoose.model<IMessage>('Message', MessageSchema)
