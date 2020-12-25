import { Document, Model, model, Types, Schema, Query } from 'mongoose'

export interface IUser extends Document {
  login: string
  password: string
  avatar: string
  confirm_hash: string
  last_seen: Date

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
