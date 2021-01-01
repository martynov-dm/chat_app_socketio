import { IServerData } from './../../types/types'
import { InferActionTypes } from '../../types/types'

export type ServersActionTypes = InferActionTypes<typeof serversActions>

export const serversActions = {
  updateServers: (serversArr: IServerData[]) => {
    return {
      type: 'UPDATE_SERVERS',
      payload: serversArr,
    } as const
  },
  updateCurrentServer: (serverData: IServerData) => {
    return {
      type: 'UPDATE_CURRENT_SERVER',
      payload: serverData,
    } as const
  },
}
