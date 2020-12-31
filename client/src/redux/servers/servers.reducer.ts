import { ServersActionTypes } from './servers.actions'
const INITIAL_STATE = {
  servers: [] as any[],
}

export type InitialStateType = typeof INITIAL_STATE

const serversReducer = (
  state = INITIAL_STATE,
  action: ServersActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'ADD_INITIAL_SERVERS':
      return {
        ...state,
        servers: [...state.servers, ...action.payload],
      }

    default:
      return state
  }
}

export default serversReducer
