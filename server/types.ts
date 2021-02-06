import { IUser } from './models/user/user.types'
import { Socket } from 'socket.io'

export interface SocketWithUserData extends Socket {
  userData: IUser
}

export interface IDecodedData {
  _id: string
}
