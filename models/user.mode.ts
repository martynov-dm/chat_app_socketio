import mongoose from 'mongoose'

export interface UserModelInterface {
  _id?: string
  login: string
  password: string
}

const userSchema = new mongoose.Schema<UserModelInterface>(
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
    profileImageUrl: String,
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('users', userSchema)
