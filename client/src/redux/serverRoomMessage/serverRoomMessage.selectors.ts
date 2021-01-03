import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectserverRoomMessageReducer = (state: AppStateType) =>
  state.serverRoomMessageReducer

export const selectServers = createSelector(
  [selectserverRoomMessageReducer],
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

export const selectCurrentRoomsArr = createSelector(
  [selectCurrentServer],
  (currentServer) => currentServer.rooms
)
