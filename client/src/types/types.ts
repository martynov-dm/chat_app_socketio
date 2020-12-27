////REDUX TYPES////////////////////////////////
export type InferActionTypes<T> = T extends {
  [key: string]: (...arg: any[]) => infer U
}
  ? U
  : never

////////////////////////////////////////////////////////////////

export interface ILoginPasswordAvatar {
  login: string
  password: string
  avatar: Blob
}

export interface LoginAndPassword {
  login: string
  password: string
}

export interface LoginAndImage {
  login: string
  image: string
}
