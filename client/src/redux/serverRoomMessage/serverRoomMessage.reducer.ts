import { IRoomData } from './../../types/types'
import { IServerData } from '../../types/types'
import { IMessage } from '../../types/types'
import { serverRoomMessageActionsTypes } from './serverRoomMessage.actions'

const INITIAL_STATE = {
  servers: {
    serversArr: [] as IServerData[],
    currentServer: {} as IServerData,
  },
  rooms: {
    roomsArr: [] as IRoomData[],
    currentRoomIndex: 0,
  },
  messages: {
    messagesArr: [] as Array<IMessage>,
  },
}

export type InitialStateType = typeof INITIAL_STATE

const serverRoomMessageReducer = (
  state = INITIAL_STATE,
  action: serverRoomMessageActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'ADD_INITIAL_SERVERS':
      return {
        ...state,
        servers: {
          ...state.servers,
          serversArr: action.payload,
        },
      }
    case 'UPDATE_CURRENT_SERVER':
      return {
        ...state,
        servers: {
          ...state.servers,
          currentServer: action.payload,
        },
      }
    case 'UPDATE_ROOMS_ARR':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsArr: action.payload,
        },
      }

    case 'UPDATE_CURRENT_ROOM_INDEX':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          currentRoomIndex: action.payload,
        },
      }

    default:
      return state
  }
}

export default serverRoomMessageReducer
