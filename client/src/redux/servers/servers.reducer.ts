import { IServerData } from './../../types/types'
import { ServersActionTypes } from './servers.actions'
const INITIAL_STATE = {
  servers: [] as IServerData[],
  currentServer: {} as IServerData,
}

export type InitialStateType = typeof INITIAL_STATE

const serversReducer = (
  state = INITIAL_STATE,
  action: ServersActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'UPDATE_SERVERS':
      return {
        ...state,
        servers: action.payload,
      }
    case 'UPDATE_CURRENT_SERVER':
      return {
        ...state,
        currentServer: action.payload,
      }

    default:
      return state
  }
}

export default serversReducer
