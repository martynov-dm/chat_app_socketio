import { InferActionTypes, LoginAndPassword } from './../../types/types'
import { ILoginPasswordAvatar } from '../../types/types'

export type AuthActionTypes = InferActionTypes<typeof authActions>

export const authActions = {
  signUpStart: (loginPasswordAvatar: ILoginPasswordAvatar) => {
    return {
      type: 'SIGN_UP_START',
      payload: loginPasswordAvatar,
    } as const
  },
  signUpSuccess: () => {
    return {
      type: 'SIGN_UP_SUCCESS',
    } as const
  },
  signUpFailure: (errorMessage: string) => {
    return {
      type: 'SIGN_UP_FAILURE',
      payload: errorMessage,
    } as const
  },
  signUpClear: () => {
    return {
      type: 'SIGN_UP_CLEAR',
    } as const
  },

  signInStart: (loginAndPassword: LoginAndPassword) => {
    return {
      type: 'SIGN_IN_START',
      payload: loginAndPassword,
    } as const
  },

  // signInSuccess: (nameImagePassword: LoginAndImage) => {
  //   return {
  //     type: 'SIGN_IN_SUCCESS',
  //     payload: nameImagePassword,
  //   } as const
  // },
}
