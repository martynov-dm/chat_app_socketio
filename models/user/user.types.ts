import { Document, Model } from 'mongoose'

export interface IUser extends Document {
  login: string
  password: string
  avatar: string
  currentRoomId: string
  confirm_hash: string
  last_seen: Date
  currentServerEndpoint: string

  passwordMatches(): Promise<boolean>
}

export interface UserModel extends Model<IUser> {
  findAndValidateUser({
    login,
    password,
  }: {
    login: string
    password: string
  }): Promise<IUser>
}
