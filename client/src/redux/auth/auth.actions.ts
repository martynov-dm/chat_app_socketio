import {
  InferActionTypes,
  LoginAndImage,
  LoginAndPassword,
} from './../../types/types'
import { LoginPasswordImage } from '../../types/types'

export type AuthActionTypes = InferActionTypes<typeof authActions>

export const authActions = {
  signUpStart: (loginPasswordAndImage: LoginPasswordImage) => {
    return {
      type: 'SIGN_UP_START',
      payload: loginPasswordAndImage,
    } as const
  },

  signInStart: (loginAndPassword: LoginAndPassword) => {
    return {
      type: 'SIGN_IN_START',
      payload: loginAndPassword,
    } as const
  },

  signInSuccess: (nameImagePassword: LoginAndImage) => {
    return {
      type: 'SIGN_IN_SUCCESS',
      payload: nameImagePassword,
    } as const
  },
}
