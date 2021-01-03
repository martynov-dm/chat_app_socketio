import { signUpRequest, signInRequest } from './../../api/api'
import { authActions } from './auth.actions'
import {
  ILoginAndPassword,
  ILoginPasswordAvatar,
  TAuthActionsWithPayload,
} from './../../types/types'
import { takeLatest, all, put } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as Effects from 'redux-saga/effects'

const call: any = Effects.call

export function* signIn(action: TAuthActionsWithPayload) {
  const { login, password } = action.payload as ILoginAndPassword
  try {
    const { data } = yield call(signInRequest, [login, password])
    console.log(data)

    yield sessionStorage.setItem('token', data.token)
    yield put(authActions.signInSuccess(data.user))
    yield put(push('/'))
  } catch (error) {
    yield put(authActions.signInFailure(error.response.data.message))
  }
}

export function* signUp(action: TAuthActionsWithPayload) {
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
