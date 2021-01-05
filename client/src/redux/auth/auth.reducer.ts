import { AuthActionTypes } from './auth.actions'

const INITIAL_STATE = {
  userData: {
    login: '',
    avatar: '',
    id: '',
  },
  signUpRequest: {
    status: 'idle' as 'idle' | 'loading' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  signInRequest: {
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
    case 'SIGN_IN_START':
      return {
        ...state,
        signInRequest: { ...state.signInRequest, status: 'loading' },
      }
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        signInRequest: { ...state.signInRequest, status: 'succeeded' },
      }
    case 'SIGN_IN_FAILURE':
      return {
        ...state,
        signInRequest: {
          ...state.signInRequest,
          status: 'failed',
          error: action.payload,
        },
      }
    case 'SIGN_IN_CLEAR':
      return {
        ...state,
        signInRequest: {
          ...state.signInRequest,
          status: 'idle',
          error: null,
        },
      }
    case 'ADD_USER_DATA':
      return {
        ...state,
        userData: {
          login: action.payload.login,
          avatar: action.payload.avatar,
          id: action.payload._id,
        },
      }
    default:
      return state
  }
}

export default authReducer
