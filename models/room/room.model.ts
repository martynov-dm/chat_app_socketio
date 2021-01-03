import { IServer } from './../server/server.types'
import { MessageSchema } from '../message/message.model'
import { IUser } from '../user/user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { IMessage } from 'models/message/message.model'

export interface IRoom extends Document {
  roomTitle: string
  currentUsers: string[]
}

export const RoomSchema = new Schema(
  {
    roomTitle: { type: String, require: true, max: 20, min: 1 },

    currentUsers: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

RoomSchema.virtual('userCount').get(function (this: IRoom) {
  return this.currentUsers.length
})

/// Virtual Populate
RoomSchema.virtual('messages', {
  ref: 'Message',
  foreignField: 'room',
  localField: '_id',
})

// RoomSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'currentUsers',
//     select: 'login avatar',
//   })

//   next()
// })

export const RoomModel = mongoose.model<IRoom>('Room', RoomSchema)
