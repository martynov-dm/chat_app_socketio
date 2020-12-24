import mongoose, { Schema, Document } from 'mongoose'
import { differenceInMinutes } from 'date-fns'
import bcrypt from 'bcryptjs'

export interface UserInterface extends Document {
  login: string
  password: string
  avatar: string
  confirm_hash: string
  last_seen: Date
}

const UserSchema: Schema = new mongoose.Schema<UserInterface>(
  {
    login: {
      type: String,
      required: true,
      min: 2,
      max: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 6,
    },
    avatar: {
      type: String,
      required: true,
    },
    last_seen: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.virtual('isOnline').get(function (this: any) {
  return differenceInMinutes(new Date(), this.last_seen) < 10
})

UserSchema.set('toJSON', {
  virtuals: true,
})

UserSchema.pre<UserInterface>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)
  return next()
})

const User = mongoose.model<UserInterface>('Users', UserSchema)

export default User
