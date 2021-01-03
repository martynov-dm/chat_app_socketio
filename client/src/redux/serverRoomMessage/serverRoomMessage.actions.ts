import { IRoomData, IServerData } from '../../types/types'
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
  updateCurrentRoom: (index: number) => {
    return {
      type: 'UPDATE_CURRENT_ROOM_INDEX',
      payload: index,
    } as const
  },

  addNewMessage: (message: string) => {
    return {
      type: 'ADD_NEW_MESSAGE',
      payload: message,
    } as const
  },
}
