import { signUpRequest } from './../../api/api'
import { AuthActionTypes, authActions } from './auth.actions'
import { ILoginPasswordAvatar } from './../../types/types'
import { takeLatest, all, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as Effects from 'redux-saga/effects'

const call: any = Effects.call

export function* signIn(action: AuthActionTypes) {}

export function* signUp(
  action: Extract<AuthActionTypes, { type: string; payload: any }>
) {
  const { login, password, avatar } = action.payload as ILoginPasswordAvatar

  try {
    yield call(signUpRequest, [login, password, avatar])

    yield put(authActions.signUpSuccess())
    yield put(push('/sign-in'))
  } catch (error) {
    yield put(authActions.signUpFailure(error.response.data))
  }
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
