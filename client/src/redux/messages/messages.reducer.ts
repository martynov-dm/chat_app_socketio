import { MessagesActionTypes } from './messages.actions'
const INITIAL_STATE = {
  messages: [] as Array<any>,
}

export type InitialStateType = typeof INITIAL_STATE

const messagesReducer = (
  state = INITIAL_STATE,
  action: MessagesActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
      }
    case 'ADD_HISTORY':
      return {
        ...state,
        messages: action.payload,
      }

    default:
      return state
  }
}

export default messagesReducer
