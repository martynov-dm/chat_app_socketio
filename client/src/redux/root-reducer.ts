import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'
import serverRoomMessageReducer from './serverRoomMessage/serverRoomMessage.reducer'
import { History } from 'history'

const rootReducer = (history: History<unknown>) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    serverRoomMessageReducer: serverRoomMessageReducer,
  })

export default rootReducer
