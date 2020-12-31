import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectRooms = (state: AppStateType) => state.rooms

export const selectRoomsArr = createSelector(
  [selectRooms],
  (rooms) => rooms.rooms
)
export const peopleInTheRoom = createSelector(
  [selectRooms],
  (rooms) => rooms.peopleCountInCurrentRoom
)

export const selectCurrentRoomName = createSelector(
  [selectRooms],
  (rooms) => rooms.currentRoomName
)
