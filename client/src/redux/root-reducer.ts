import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'
import serverRoomMessageReducer from './serverRoomMessage/serverRoomMessage.reducer'

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    serverRoomMessageReducer: serverRoomMessageReducer,
  })

export default rootReducer
