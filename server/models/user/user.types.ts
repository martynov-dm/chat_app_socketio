import { Document, Model } from 'mongoose'

export interface IUser extends Document {
  login: string
  password: string
  avatar: string
  currentRoomId: string
  confirm_hash: string
  last_seen: Date
  currentServerEndpoint: string

  passwordMatches(arg0: string): Promise<boolean>
}

export interface IUserJSONWithoutPassword {
  password?: string
  login: string
  avatar: string
  currentRoomId: string
  currentServerEndpoint: string
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
