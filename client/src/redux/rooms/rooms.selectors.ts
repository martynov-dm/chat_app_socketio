import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectRooms = (state: AppStateType) => state.rooms

export const selectRoomsArr = createSelector(
  [selectRooms],
  (rooms) => rooms.rooms
)
