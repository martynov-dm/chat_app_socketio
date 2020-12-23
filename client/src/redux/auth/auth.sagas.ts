import { AuthActionTypes } from './auth.actions'
import { NameAndPassword } from './../../types/types'
import { takeLatest, put, all, call } from 'redux-saga/effects'

import { push } from 'connected-react-router'

export function* signIn(action: AuthActionTypes) {}

export function* signUp(action: AuthActionTypes) {}

export function* onSignInStart() {
  yield takeLatest('SIGN_IN_START', signIn)
}

export function* onSignUpStart() {
  yield takeLatest('SIGN_UP_START', signUp)
}

export function* authSagas() {
  yield all([call(onSignInStart), call(onSignUpStart)])
}
