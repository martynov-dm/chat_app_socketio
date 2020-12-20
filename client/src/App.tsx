import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import './App.scss'
import { history } from './redux/store'

const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route exact path='/sign-in' component={SignUp} />
      </Switch>
    </ConnectedRouter>
  )
}

export default App
