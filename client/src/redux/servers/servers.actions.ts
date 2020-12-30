import { InferActionTypes } from '../../types/types'

export type ServersActionTypes = InferActionTypes<typeof serversActions>

export const serversActions = {
  addInitialServers: (serverData: any[]) => {
    return {
      type: 'ADD_INITIAL_SERVERS',
      payload: serverData,
    } as const
  },
}
