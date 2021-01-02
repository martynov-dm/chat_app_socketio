import { selectCurrentServer } from './../servers/servers.selectors'
import { AppStateType } from '../store'
import { createSelector } from 'reselect'

export const selectCurrentRoomsArr = createSelector(
  [selectCurrentServer],
  (currentServer) => currentServer.rooms
)
// export const peopleInTheRoom = createSelector(
//   [selectRooms],
//   (rooms) => rooms.peopleCountInCurrentRoom
// )

export const selectCurrentRoomName = createSelector(
  [selectCurrentRoomsArr],
  (rooms) => rooms.currentRoom
)
