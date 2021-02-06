import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { history, configureStore } from './redux/store'
import { ConnectedRouter } from 'connected-react-router'
import './index.css'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,

  document.getElementById('root')
)
