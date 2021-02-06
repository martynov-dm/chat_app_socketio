import { IUser, UserModel, IUserJSONWithoutPassword } from './user.types'
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
  return bcrypt.compareSync(password, (this as IUser).password)
}

UserSchema.statics.findAndValidateUser = async function ({
  login,
  password,
}: {
  login: string
  password: string
}): Promise<IUserJSONWithoutPassword> {
  const user = await this.findOne({ login })
    .select('+password -__v -createdAt -updatedAt')
    .exec()
  if (!user) {
    throw new Error('Login not found')
  }
  const isPasswordOk = await (user as IUser).passwordMatches(password)

  if (!isPasswordOk) {
    throw new Error('Password is not valid')
  }
  const JsonUser = user.toJSON()
  delete (JsonUser as IUserJSONWithoutPassword).password

  return JsonUser as IUserJSONWithoutPassword
}

const User = mongoose.model<IUser, UserModel>('Users', UserSchema)

export default User
