////REDUX TYPES////////////////////////////////
export type InferActionTypes<T> = T extends {
  [key: string]: (...arg: any[]) => infer U
}
  ? U
  : never

////////////////////////////////////////////////////////////////

export interface LoginPasswordImage {
  login: string
  password: string
  image: string
}

export interface LoginAndPassword {
  login: string
  password: string
}

export interface LoginAndImage {
  login: string
  image: string
}
