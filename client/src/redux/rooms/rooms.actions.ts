import { IRoomData } from './../../types/types'
import { InferActionTypes } from '../../types/types'

export type RoomsActionTypes = InferActionTypes<typeof roomsActions>

export const roomsActions = {
  updateRooms: (roomsData: any[]) => {
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
}
