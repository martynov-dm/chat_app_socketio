import { AppStateType } from '../store'
import { createSelector } from 'reselect'

const selectMessages = (state: AppStateType) => state.messages

export const selectMessagesArr = createSelector(
  [selectMessages],
  (messages) => {
    const MessagesArrCopy = [...messages.messages]
    return MessagesArrCopy.reverse()
  }
)
