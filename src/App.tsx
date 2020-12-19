import React from 'react'
import logo from './logo.svg'
import './App.css'

const App: React.FC = () => {
  return (
    <ConnectedRouter history={history}>
      <div className='App'>
        <Switch>
          <Route
            exact
            path='/'
            render={() =>
              !currentUser ? <Redirect to='/sign-in' /> : <Main />
            }
          />
          <Route
            exact
            path='/checkout'
            render={() =>
              !currentUser ? <Redirect to='/sign-in' /> : <CheckoutPage />
            }
          />

          <Route exact path='/logs' component={Logs} />
          <Route exact path='/sign-in' component={SignIn} />
          <Route exact path='/sign-up' component={SignUp} />
        </Switch>
        <ErrorPopUp />
      </div>
    </ConnectedRouter>
  )
}

export default App
