import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectServerRoomMessageReducer = (state: AppStateType) =>
  state.serverRoomMessageReducer

export const selectRooms = createSelector(
  [selectServerRoomMessageReducer],
  (serverRoomMessageReducer) => serverRoomMessageReducer.rooms
)

export const selectServers = createSelector(
  [selectServerRoomMessageReducer],
  (serverRoomMessageReducer) => serverRoomMessageReducer.servers
)

export const selectServersArr = createSelector(
  [selectServers],
  (servers) => servers.serversArr
)

export const selectCurrentServer = createSelector(
  [selectServers],
  (servers) => servers.currentServer
)

export const selectRoomsArrFromServer = createSelector(
  [selectCurrentServer],
  (currentServer) => currentServer.rooms
)

export const selectCurrentRoom = createSelector(
  [selectRooms],
  (rooms) => rooms.currentRoom
)

export const selectCurrentRoomMessages = createSelector(
  [selectCurrentRoom],
  (currentRoom) => currentRoom.messages
)

export const selectCurrentRoomName = createSelector(
  [selectCurrentRoom],
  (currentRoom) => currentRoom.roomTitle
)

export const selectCurrentRoomUserCount = createSelector(
  [selectCurrentRoom],
  (currentRoom) => currentRoom.userCount
)

export const selectCurrentRoomId = createSelector(
  [selectCurrentRoom],
  (currentRoom) => currentRoom._id
)
