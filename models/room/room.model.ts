import { MessageModel } from './../message/message.model'
import { IServer } from './../server/server.types'
import { MessageSchema } from '../message/message.model'
import { IUser } from '../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { IMessage } from 'models/message/message.model'
import User from '../user/user.model'

export interface IRoom extends Document {
  roomTitle: string
  server: string | Schema.Types.ObjectId
}

export const RoomSchema = new Schema(
  {
    roomTitle: { type: String, require: true, max: 20, min: 1 },
    server: { type: Schema.Types.ObjectId, ref: 'Server', required: true },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// RoomSchema.virtual('userCount').get(function (this: IRoom) {
//   return this.users.length
// })

/// Virtual Populate
RoomSchema.virtual('messages', {
  ref: MessageModel,
  localField: '_id',
  foreignField: 'room',
  options: { select: '-__v' },
})

RoomSchema.virtual('users', {
  ref: User,
  localField: '_id',
  foreignField: 'room',
  options: { select: '-__v' },
})

// RoomSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'messages',
//   }).populate({
//     path: 'users',
//   })

//   next()
// })

export const RoomModel = mongoose.model<IRoom>('Room', RoomSchema)
