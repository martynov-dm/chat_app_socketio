import { AppStateType } from './../store'
import { createSelector } from 'reselect'

const selectAuth = (state: AppStateType) => state.auth

export const selectSignUpReq = createSelector(
  [selectAuth],
  (auth) => auth.signUpRequest
)

export const selectSignUpReqError = createSelector(
  [selectSignUpReq],
  (signUpRequest) => signUpRequest.error
)

export const selectSignUpReqStatus = createSelector(
  [selectSignUpReq],
  (signUpRequest) => signUpRequest.status
)
