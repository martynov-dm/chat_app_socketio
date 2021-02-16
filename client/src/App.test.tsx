import React from 'react'
import { render } from '@testing-library/react'
import App from './App'
import { ConnectedRouter } from 'connected-react-router'
import { configureStore, history } from './redux/store'
import { Provider } from 'react-redux'

const store = configureStore()

describe('When everything is OK', () => {
  test('should render the App without crashing', () => {
    render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    )
  })
})
