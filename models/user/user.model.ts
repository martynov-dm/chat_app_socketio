import { IUser, UserModel } from './user.types'
import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema: Schema = new Schema(
  {
    login: {
      type: String,
      required: true,
      min: 2,
      max: 15,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      min: 3,
      select: false,
    },
    avatar: {
      type: String,
      required: true,
    },
    currentRoomId: { type: Schema.Types.ObjectId, ref: 'Room' },
    currentServerEndpoint: { type: String },
  },
  {
    timestamps: true,
  }
)

UserSchema.set('toJSON', {
  virtuals: true,
})

UserSchema.pre<IUser>('save', async function (next) {
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
  const user = await this.findOne({ login })
    .select('+password -__v -createdAt -updatedAt')
    .exec()
  if (!user) {
    throw new Error('Login not found')
  }
  const isPasswordOk = await user.passwordMatches(password)

  if (!isPasswordOk) {
    throw new Error('Password is not valid')
  }
  const JsonUser = user.toJSON()
  delete JsonUser.password

  return JsonUser
}

const User = mongoose.model<IUser, UserModel>('Users', UserSchema)

export default User
