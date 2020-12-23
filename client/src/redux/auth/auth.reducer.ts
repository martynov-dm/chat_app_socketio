import { AuthActionTypes } from './auth.actions'
const INITIAL_STATE = {
  userName: null as null | string,
  userImage: null as null | string,
}

export type InitialStateType = typeof INITIAL_STATE

const authReducer = (
  state = INITIAL_STATE,
  action: AuthActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        userName: action.payload.login,
        userImage: action.payload.image,
      }

    default:
      return state
  }
}

export default authReducer
