import { IMessage, IRoomData, IServerData, IUser } from '../../types/types'
import { InferActionTypes } from '../../types/types'

export type serverRoomMessageActionsTypes = InferActionTypes<
  typeof serverRoomMessageActions
>

export const serverRoomMessageActions = {
  addInitialServers: (serversArr: IServerData[]) => {
    return {
      type: 'ADD_INITIAL_SERVERS',
      payload: serversArr,
    } as const
  },
  addCurrentServer: (serverData: IServerData) => {
    return {
      type: 'ADD_CURRENT_SERVER',
      payload: serverData,
    } as const
  },

  addCurrentRoomData: (roomData: IRoomData) => {
    return {
      type: 'ADD_CURRENT_ROOM_DATA',
      payload: roomData,
    } as const
  },

  updateCurrentRoom: (index: number) => {
    return {
      type: 'UPDATE_CURRENT_ROOM_INDEX',
      payload: index,
    } as const
  },

  addNewMessage: (message: IMessage) => {
    return {
      type: 'ADD_NEW_MESSAGE',
      payload: message,
    } as const
  },

  updateUsers: (users: IUser[]) => {
    return {
      type: 'UPDATE_USERS',
      payload: users,
    } as const
  },
}
