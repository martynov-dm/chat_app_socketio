import { createStore, applyMiddleware, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga'
import rootReducer from './root-reducer'
import rootSaga from './root-saga'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

export const history = createBrowserHistory()

const rootReducerWithHistory = rootReducer(history)

const sagaMiddleware = createSagaMiddleware()
const middlewares = [sagaMiddleware, routerMiddleware(history)]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export function configureStore(preloadedState?: any) {
  const store = createStore(
    rootReducerWithHistory,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  )
  sagaMiddleware.run(rootSaga)

  return store
}
