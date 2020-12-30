import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectServers = (state: AppStateType) => state.servers

export const selectServersArr = createSelector(
  [selectServers],
  (servers) => servers.servers
)
