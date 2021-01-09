import { InferActionTypes, ILoginAndPassword, IUser } from './../../types/types'
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
  signInStart: (loginAndPassword: ILoginAndPassword) => {
    return {
      type: 'SIGN_IN_START',
      payload: loginAndPassword,
    } as const
  },
  signInSuccess: () => {
    return {
      type: 'SIGN_IN_SUCCESS',
    } as const
  },
  signInFailure: (errorMessage: string) => {
    return {
      type: 'SIGN_IN_FAILURE',
      payload: errorMessage,
    } as const
  },
  signInClear: () => {
    return {
      type: 'SIGN_IN_CLEAR',
    } as const
  },
  setUserData: (userData: IUser) => {
    return {
      type: 'SET_USER_DATA',
      payload: userData,
    } as const
  },
}
