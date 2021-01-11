import { IMessage, IRoomData, IServerData, IUser } from '../../types/types'
import { InferActionTypes } from '../../types/types'

export type serverRoomMessageActionsTypes = InferActionTypes<
  typeof serverRoomMessageActions
>

export const serverRoomMessageActions = {
  setServersArr: (serversArr: IServerData[]) => {
    return {
      type: 'SET_INITIAL_SERVERS_ARR',
      payload: serversArr,
    } as const
  },
  setCurrentServer: (serverData: IServerData) => {
    return {
      type: 'SET_CURRENT_SERVER_DATA',
      payload: serverData,
    } as const
  },
  setCurrentServerRoomsArr: (roomsArr: IRoomData[]) => {
    return {
      type: 'SET_CURRENT_SERVER_ROOMS_ARR',
      payload: roomsArr,
    } as const
  },

  setCurrentRoomData: (roomData: IRoomData) => {
    return {
      type: 'SET_CURRENT_ROOM_DATA',
      payload: roomData,
    } as const
  },

  setMessages: (messagesArr: IMessage[]) => {
    return {
      type: 'SET_MESSAGES',
      payload: messagesArr,
    } as const
  },

  setUsers: (usersArr: IUser[]) => {
    return {
      type: 'SET_USERS',
      payload: usersArr,
    } as const
  },

  addNewMessage: (message: IMessage) => {
    return {
      type: 'ADD_NEW_MESSAGE',
      payload: message,
    } as const
  },
  addNewRoom: (room: IRoomData) => {
    return {
      type: 'ADD_NEW_ROOM',
      payload: room,
    } as const
  },

  updateUsers: (users: IUser[]) => {
    return {
      type: 'UPDATE_USERS',
      payload: users,
    } as const
  },
}
