import { InferActionTypes } from './../../types/types'

export type SuccessAndErrorsActionTypes = InferActionTypes<
  typeof SuccessAndErrorsActions
>

export const SuccessAndErrorsActions = {
  addErrorMessage: (successMessage: string) => {
    return {
      type: 'ADD_ERROR_MESSAGE',
      payload: successMessage,
    } as const
  },

  removeErrorMessage: () => {
    return {
      type: 'REMOVE_ERROR_MESSAGE',
    } as const
  },
  addSuccessMessage: (successMessage: string) => {
    return {
      type: 'ADD_SUCCESS_MESSAGE',
      payload: successMessage,
    } as const
  },

  removeSuccessMessage: () => {
    return {
      type: 'REMOVE_SUCCESS_MESSAGE',
    } as const
  },
}
