import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'
import messagesReducer from './messages/messages.reducer'

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    messages: messagesReducer,
  })

export default rootReducer
