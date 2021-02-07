import React, { Suspense, lazy } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { ChakraProvider } from '@chakra-ui/react'

import { history } from './redux/store'
import { SocketProvider } from './socket.io/socket'
import SpinnerSuspense from './components/common/SpinnerSuspense'

const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Main = lazy(() => import('./pages/Main'))

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ConnectedRouter history={history}>
        <SocketProvider>
          <Suspense fallback={<SpinnerSuspense />}>
            <Switch>
              <Route
                exact
                path='/'
                render={() => {
                  const token = sessionStorage.getItem('token')
                  return !token ? <Redirect to='/sign-in' /> : <Main />
                }}
              />
              <Route exact path='/sign-in' component={SignIn} />
              <Route exact path='/sign-up' component={SignUp} />
            </Switch>
          </Suspense>
        </SocketProvider>
      </ConnectedRouter>
    </ChakraProvider>
  )
}

export default App
