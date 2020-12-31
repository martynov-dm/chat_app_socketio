import { InferActionTypes } from '../../types/types'

export type MessagesActionTypes = InferActionTypes<typeof messagesActions>

export const messagesActions = {
  addNewMessage: (message: string) => {
    return {
      type: 'ADD_NEW_MESSAGE',
      payload: message,
    } as const
  },
  addHistory: (history: any[]) => {
    return {
      type: 'ADD_HISTORY',
      payload: history,
    } as const
  },
}
