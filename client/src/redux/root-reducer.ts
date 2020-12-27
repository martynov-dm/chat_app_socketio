import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
  })

export default rootReducer
