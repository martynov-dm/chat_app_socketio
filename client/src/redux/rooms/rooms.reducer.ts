import { IRoomData } from './../../types/types'
import { RoomsActionTypes } from './rooms.actions'
const INITIAL_STATE = {
  rooms: [] as IRoomData[],
  peopleCountInCurrentRoom: 0,
  currentRoom: {} as IRoomData,
}

export type InitialStateType = typeof INITIAL_STATE

const roomsReducer = (
  state = INITIAL_STATE,
  action: RoomsActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'UPDATE_ROOMS_ARR':
      return {
        ...state,
        rooms: action.payload,
      }
    case 'UPDATE_PEOPLE_COUNT':
      return {
        ...state,
        peopleCountInCurrentRoom: action.payload,
      }
    case 'UPDATE_CURRENT_ROOM':
      return {
        ...state,
        currentRoom: action.payload,
      }

    default:
      return state
  }
}

export default roomsReducer
