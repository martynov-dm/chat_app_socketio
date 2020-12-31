import { RoomsActionTypes } from './rooms.actions'
const INITIAL_STATE = {
  rooms: [] as any[],
  peopleCountInCurrentRoom: 0,
  currentRoomName: '',
}

export type InitialStateType = typeof INITIAL_STATE

const roomsReducer = (
  state = INITIAL_STATE,
  action: RoomsActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'UPDATE_ROOMS':
      return {
        ...state,
        rooms: action.payload,
      }
    case 'UPDATE_PEOPLE_COUNT':
      return {
        ...state,
        peopleCountInCurrentRoom: action.payload,
      }
    case 'UPDATE_CURRENT_ROOM_NAME':
      return {
        ...state,
        currentRoomName: action.payload,
      }

    default:
      return state
  }
}

export default roomsReducer
