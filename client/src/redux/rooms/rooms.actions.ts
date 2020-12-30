import { InferActionTypes } from '../../types/types'

export type RoomsActionTypes = InferActionTypes<typeof roomsActions>

export const roomsActions = {
  addInitialRooms: (roomsData: any[]) => {
    return {
      type: 'ADD_INITIAL_ROOMS',
      payload: roomsData,
    } as const
  },
}
