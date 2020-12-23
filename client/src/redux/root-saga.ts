import { all, call } from 'redux-saga/effects'
import { authSagas } from './auth/auth.sagas'

function* rootSaga() {
  yield all([call(authSagas)])
}

export default rootSaga
