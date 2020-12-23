import { signUpRequest } from './../../api/api'
import { AuthActionTypes } from './auth.actions'
import { LoginPasswordImage } from './../../types/types'
import { takeLatest, put, all } from 'redux-saga/effects'
import * as Effects from 'redux-saga/effects'

import { push } from 'connected-react-router'
import { SagaIterator } from 'redux-saga'

const call: any = Effects.call

export function* signIn(action: AuthActionTypes) {}

export function* signUp(action: AuthActionTypes) {
  const { login, password, image } = action.payload as LoginPasswordImage

  try {
    const response = yield call(signUpRequest, [login, password, image])
  } catch (error) {}
}

export function* onSignInStart() {
  yield takeLatest('SIGN_IN_START', signIn)
}

export function* onSignUpStart() {
  yield takeLatest('SIGN_UP_START', signUp)
}

export function* authSagas() {
  yield all([call(onSignInStart), call(onSignUpStart)])
}
