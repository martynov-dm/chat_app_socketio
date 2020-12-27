import { SuccessAndErrorsActions } from './successAndErrors/successAndErrors.actions'
import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'
import successAndErrorsReducer from './successAndErrors/successAndErrors.reducer'

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    successAndErrors: successAndErrorsReducer,
  })

export default rootReducer
