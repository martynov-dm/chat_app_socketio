import { IRoomData, IRoomDataWithPeopleCount } from './../../types/types'
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
    currentRoom: {} as IRoomData,
    currentRoomPeople,
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
    case 'UPDATE_SERVERS':
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
    case 'UPDATE_PEOPLE_COUNT':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          currentRoom: {
            ...state.rooms.currentRoom,
            peopleCount: action.payload,
          },
        },
      }
    case 'UPDATE_CURRENT_ROOM':
      return {
        ...state,
        servers: {
          ...state.servers,
          currentServer: action.payload,
        },
      }

    default:
      return state
  }
}

export default serverRoomMessageReducer
