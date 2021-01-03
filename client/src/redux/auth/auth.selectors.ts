import { AppStateType } from './../store'
import { createSelector } from 'reselect'

const selectAuth = (state: AppStateType) => state.auth

export const selectSignUpReq = createSelector(
  [selectAuth],
  (auth) => auth.signUpRequest
)

export const selectSignInReq = createSelector(
  [selectAuth],
  (auth) => auth.signInRequest
)

export const selectSignUpReqError = createSelector(
  [selectSignUpReq],
  (signUpRequest) => signUpRequest.error
)

export const selectSignUpReqStatus = createSelector(
  [selectSignUpReq],
  (signUpRequest) => signUpRequest.status
)

export const selectSignInReqError = createSelector(
  [selectSignInReq],
  (signInRequest) => signInRequest.error
)

export const selectSignInReqStatus = createSelector(
  [selectSignInReq],
  (signInRequest) => signInRequest.status
)

export const selectUser = createSelector([selectAuth], (auth) => auth.userData)

export const selectUserId = createSelector(
  [selectUser],
  (userData) => userData.id
)
