import { AuthActionTypes } from './../redux/auth/auth.actions'
////REDUX TYPES////////////////////////////////
export type InferActionTypes<T> = T extends {
  [key: string]: (...arg: any[]) => infer U
}
  ? U
  : never

////////////////////////////////////////////////////////////////

export type TAuthActionsWithPayload = Extract<
  AuthActionTypes,
  { type: string; payload: any }
>

export interface ILoginPasswordAvatar {
  login: string
  password: string
  avatar: Blob
}

export interface ILoginAndPassword {
  login: string
  password: string
}

export interface LoginAndImage {
  login: string
  image: string
}

///////////SOCKET IO TYPES //////////////////////////////////
export interface IServerData {
  _id: string
  title: string
  image: string
  endpoint: string
  isPrivate: boolean
  createdAt: string
  updatedAt: string
  rooms: IRoomData[]
}

export interface IRoomData {
  _id: string
  createdAt: string
  updatedAt: string
  isPrivate: boolean
  roomTitle: string
  history: string[]
}
