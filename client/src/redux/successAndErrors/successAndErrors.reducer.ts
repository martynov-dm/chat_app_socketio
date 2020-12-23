import { SuccessAndErrorsActionTypes } from './successAndErrors.actions'
const INITIAL_STATE = {
  successMessage: null as null | string,
  errorMessage: null as null | string,
}

export type InitialStateType = typeof INITIAL_STATE

const authReducer = (
  state = INITIAL_STATE,
  action: SuccessAndErrorsActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'REMOVE_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      }
    case 'REMOVE_ERROR_MESSAGE':
      return {
        ...state,
        successMessage: null,
      }
    case 'ADD_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      }
    case 'ADD_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default authReducer
