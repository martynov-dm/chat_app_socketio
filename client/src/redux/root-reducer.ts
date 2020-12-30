import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import authReducer from './auth/auth.reducer'
import messagesReducer from './messages/messages.reducer'
import serversReducer from './servers/servers.reducer'

const rootReducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer,
    messages: messagesReducer,
    servers: serversReducer,
  })

export default rootReducer
