import { InferActionTypes, NameAndImage } from './../../types/types'
import { NameAndPassword } from '../../types/types'

export type AuthActionTypes = InferActionTypes<typeof authActions>

export const authActions = {
  signUpStart: (nameAndPassword: NameAndPassword) => {
    return {
      type: 'SIGN_UP_START',
      payload: nameAndPassword,
    } as const
  },

  signInStart: (nameAndPassword: NameAndPassword) => {
    return {
      type: 'SIGN_IN_START',
      payload: nameAndPassword,
    } as const
  },

  signInSuccess: (nameAndImage: NameAndImage) => {
    return {
      type: 'SIGN_IN_SUCCESS',
      payload: nameAndImage,
    } as const
  },
}
