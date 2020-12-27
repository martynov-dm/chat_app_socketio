import { AuthActionTypes } from './auth.actions'
const INITIAL_STATE = {
  userName: null as null | string,
  userImage: null as null | string,
  signUpRequest: {
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
}

export type InitialStateType = typeof INITIAL_STATE

const authReducer = (
  state = INITIAL_STATE,
  action: AuthActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'SIGN_UP_START':
      return {
        ...state,
        signUpRequest: { ...state.signUpRequest, status: 'loading' },
      }
    case 'SIGN_UP_SUCCESS':
      return {
        ...state,
        signUpRequest: { ...state.signUpRequest, status: 'succeeded' },
      }
    case 'SIGN_UP_FAILURE':
      return {
        ...state,
        signUpRequest: {
          ...state.signUpRequest,
          status: 'failed',
          error: action.payload,
        },
      }
    case 'SIGN_UP_CLEAR':
      return {
        ...state,
        signUpRequest: {
          ...state.signUpRequest,
          status: 'idle',
          error: null,
        },
      }

    default:
      return state
  }
}

export default authReducer
