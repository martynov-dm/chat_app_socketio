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

export const selectCurrentServerTitle = createSelector(
  [selectCurrentServer],
  (currentServer) => currentServer.title
)

export const selectCurrentServerType = createSelector(
  [selectCurrentServer],
  (currentServer) => currentServer.type
)

export const selectRoomsArr = createSelector(
  [selectRooms],
  (rooms) => rooms.roomsArr
)

export const selectCurrentRoomData = createSelector(
  [selectRooms],
  (rooms) => rooms.currentRoomData
)

export const selectMessages = createSelector(
  [selectServerRoomMessageReducer],
  (serverRoomMessageReducer) => serverRoomMessageReducer.messages
)

export const selectMessagesArr = createSelector(
  [selectMessages],
  (messages) => {
    if (messages.messagesArr.length !== 0)
      return [...messages.messagesArr].reverse()
  }
)

export const selectCurrentRoomName = createSelector(
  [selectCurrentRoomData],
  (currentRoomData) => currentRoomData.roomTitle
)

export const selectCurrentRoomUserCount = createSelector(
  [selectRooms],
  (rooms) => {
    return rooms.usersInCurrentRoom.length
  }
)

export const selectUsersArr = createSelector([selectRooms], (rooms) => {
  return rooms.usersInCurrentRoom
})

export const selectCurrentRoomId = createSelector(
  [selectCurrentRoomData],
  (currentRoom) => currentRoom._id
)
