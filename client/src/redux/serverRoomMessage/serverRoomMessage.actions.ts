import { IRoomData, IServerData } from '../../types/types'
import { InferActionTypes } from '../../types/types'

export type serverRoomMessageActionsTypes = InferActionTypes<
  typeof serverRoomMessageActions
>

export const serverRoomMessageActions = {
  updateServers: (serversArr: IServerData[]) => {
    return {
      type: 'UPDATE_SERVERS',
      payload: serversArr,
    } as const
  },
  updateCurrentServer: (serverData: IServerData) => {
    return {
      type: 'UPDATE_CURRENT_SERVER',
      payload: serverData,
    } as const
  },

  updateRooms: (roomsData: IRoomData[]) => {
    return {
      type: 'UPDATE_ROOMS_ARR',
      payload: roomsData,
    } as const
  },
  updatePeopleCount: (count: number) => {
    return {
      type: 'UPDATE_PEOPLE_COUNT',
      payload: count,
    } as const
  },
  updateCurrentRoom: (currentRoom: IRoomData) => {
    return {
      type: 'UPDATE_CURRENT_ROOM',
      payload: currentRoom,
    } as const
  },

  addNewMessage: (message: string) => {
    return {
      type: 'ADD_NEW_MESSAGE',
      payload: message,
    } as const
  },
}
