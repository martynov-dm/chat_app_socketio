import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Main from './pages/Main'
import SignUp from './pages/SignUp'
import './App.css'
import { history } from './redux/store'
import GlobalStyles from './theme/globalStyles'
import { ThemeProvider } from 'styled-components'
import myTheme from './theme/theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={myTheme}>
      <ConnectedRouter history={history}>
        <GlobalStyles />
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/sign-in' component={SignUp} />
        </Switch>
      </ConnectedRouter>
    </ThemeProvider>
  )
}

export default App
