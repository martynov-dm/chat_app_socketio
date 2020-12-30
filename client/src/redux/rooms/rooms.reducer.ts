import { roomsActions, RoomsActionTypes } from './rooms.actions'
const INITIAL_STATE = {
  rooms: [] as any[],
}

export type InitialStateType = typeof INITIAL_STATE

const roomsReducer = (
  state = INITIAL_STATE,
  action: RoomsActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'ADD_INITIAL_ROOMS':
      return {
        ...state,
        rooms: [...state.rooms, ...action.payload],
      }

    default:
      return state
  }
}

export default roomsReducer
