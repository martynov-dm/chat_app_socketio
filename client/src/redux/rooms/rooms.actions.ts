import { InferActionTypes } from '../../types/types'

export type RoomsActionTypes = InferActionTypes<typeof roomsActions>

export const roomsActions = {
  updateRooms: (roomsData: any[]) => {
    return {
      type: 'UPDATE_ROOMS',
      payload: roomsData,
    } as const
  },
  updatePeopleCount: (count: number) => {
    return {
      type: 'UPDATE_PEOPLE_COUNT',
      payload: count,
    } as const
  },
  updateCurrentRoomName: (roomName: string) => {
    return {
      type: 'UPDATE_CURRENT_ROOM_NAME',
      payload: roomName,
    } as const
  },
}
