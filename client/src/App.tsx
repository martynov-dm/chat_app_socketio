import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import { history } from './redux/store'
import { ChakraProvider } from '@chakra-ui/react'
import SignIn from './pages/SignIn'
import ErrorPopUp from './components/common/ErrorPopUp'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ConnectedRouter history={history}>
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/sign-up' component={SignUp} />
        </Switch>
      </ConnectedRouter>
    </ChakraProvider>
  )
}

export default App
