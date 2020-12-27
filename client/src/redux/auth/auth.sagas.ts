import { SuccessAndErrorsActions } from './../successAndErrors/successAndErrors.actions'
import { signUpRequest } from './../../api/api'
import { AuthActionTypes } from './auth.actions'
import { LoginPasswordImage } from './../../types/types'
import { takeLatest, all, put, delay } from 'redux-saga/effects'
import { push } from 'connected-react-router'

import * as Effects from 'redux-saga/effects'

const call: any = Effects.call

export function* signIn(action: AuthActionTypes) {}

export function* signUp(action: AuthActionTypes) {
  const { login, password, image } = action.payload as LoginPasswordImage

  try {
    const { data } = yield call(signUpRequest, [login, password, image])

    yield put(SuccessAndErrorsActions.addSuccessMessage(data.message))

    yield put(push('/sign-in'))
  } catch (error) {
    yield put(SuccessAndErrorsActions.addErrorMessage(error.response.data))
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
