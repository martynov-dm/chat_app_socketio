import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import { history } from './redux/store'
import { ChakraProvider } from '@chakra-ui/react'
import SignIn from './pages/SignIn'
import { SocketProvider } from './socket.io/socket'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ConnectedRouter history={history}>
        <SocketProvider>
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
        </SocketProvider>
      </ConnectedRouter>
    </ChakraProvider>
  )
}

export default App
