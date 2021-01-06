import { IRoomData, IUser } from './../../types/types'
import { IServerData } from '../../types/types'
import { IMessage } from '../../types/types'
import { serverRoomMessageActionsTypes } from './serverRoomMessage.actions'
import { removeUserFromArr } from './utils'

const INITIAL_STATE = {
  servers: {
    serversArr: [] as IServerData[],
    currentServer: {} as IServerData,
  },
  rooms: {
    roomsArr: [] as IRoomData[],
    currentRoomData: {} as IRoomData,
    usersInCurrentRoom: [] as IUser[],
  },

  messages: {
    messagesArr: [] as IMessage[],
  },
}

export type InitialStateType = typeof INITIAL_STATE

const serverRoomMessageReducer = (
  state = INITIAL_STATE,
  action: serverRoomMessageActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'SET_INITIAL_SERVERS_ARR':
      return {
        ...state,
        servers: {
          ...state.servers,
          serversArr: action.payload,
        },
      }
    case 'SET_CURRENT_SERVER_DATA':
      return {
        ...state,
        servers: {
          ...state.servers,
          currentServer: action.payload,
        },
      }
    case 'SET_CURRENT_SERVER_ROOMS_ARR':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          roomsArr: action.payload,
        },
      }
    case 'SET_CURRENT_ROOM_DATA':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          currentRoomData: action.payload,
        },
      }
    case 'SET_MESSAGES':
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesArr: action.payload,
        },
      }

    case 'ADD_NEW_MESSAGE':
      return {
        ...state,
        messages: {
          ...state.messages,
          messagesArr: [...state.messages.messagesArr, action.payload],
        },
      }
    case 'SET_USERS':
      return {
        ...state,
        rooms: {
          ...state.rooms,
          usersInCurrentRoom: action.payload,
        },
      }

    default:
      return state
  }
}

export default serverRoomMessageReducer
