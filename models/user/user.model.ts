import { IUser, UserModel } from './user.types'
import mongoose, { Schema, Document } from 'mongoose'
import { differenceInMinutes } from 'date-fns'
import bcrypt from 'bcryptjs'

const UserSchema: Schema = new Schema(
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
      select: false,
    },
    avatar: {
      type: String,
      required: true,
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

UserSchema.pre<IUser>('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  if (!this.isModified('password')) {
    return next()
  }

  this.password = bcrypt.hashSync(this.password)
  return next()
})

UserSchema.methods.passwordMatches = async function (password: string) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.statics.findAndValidateUser = async function ({
  login,
  password,
}: {
  login: string
  password: string
}): Promise<IUser> {
  const user = await this.findOne({ login }).select('+password').exec()
  if (!user) {
    throw new Error('Login not found')
  }
  const isPasswordOk = await user.passwordMatches(password)

  if (!isPasswordOk) {
    throw new Error('Password is not valid')
  }
  return user
}

const User = mongoose.model<IUser, UserModel>('Users', UserSchema)

export default User
