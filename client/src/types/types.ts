////REDUX TYPES////////////////////////////////
export type InferActionTypes<T> = T extends {
  [key: string]: (...arg: any[]) => infer U
}
  ? U
  : never

////////////////////////////////////////////////////////////////

export interface NameAndPassword {
  email: string
  password: string
}

export interface NameAndImage {
  name: string
  image: string
}
