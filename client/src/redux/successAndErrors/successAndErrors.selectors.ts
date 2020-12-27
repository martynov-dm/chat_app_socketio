import { AppStateType } from './../store'
import { createSelector } from 'reselect'

const selectSuccessAndErrors = (state: AppStateType) => state.successAndErrors

export const getSuccessMessage = createSelector(
  [selectSuccessAndErrors],
  (successAndErrors) => successAndErrors.successMessage
)
export const getErrorMessage = createSelector(
  [selectSuccessAndErrors],
  (successAndErrors) => successAndErrors.errorMessage
)
