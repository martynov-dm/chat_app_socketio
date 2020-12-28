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
