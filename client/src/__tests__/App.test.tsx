import React from 'react'
import {
  render,
  fireEvent,
  screen,
  waitForElementToBeRemoved,
  act,
} from '@testing-library/react'
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import App from '../App'
import { configureStore, history } from '../redux/store'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'

const store = configureStore()
const buildLoginForm = build({
  fields: {
    username: fake((faker) => faker.internet.userName()),
    password: fake((faker) => faker.internet.password()),
  },
})

test('App renders signIn and switches to SignUp onClick', async () => {
  const file = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' })

  const result = render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  )

  const { username, password } = buildLoginForm()

  const signUpLink = await screen.findByRole('link')
  expect(signUpLink).toHaveTextContent("Don't have an account? Sign Up")

  userEvent.click(signUpLink)

  await waitForElementToBeRemoved(screen.getByTestId('spinner')).then(
    async () => {
      const usernameField = await screen.getByLabelText(/login/i)
      const passwordField = await screen.getByLabelText(/password/i)
      userEvent.type(usernameField, username as string)
      userEvent.type(passwordField, password as string)

      // const addImage = result.container.querySelector('#file')

      // await act(async () =>
      //   //@ts-ignore
      //   fireEvent.change(addImage as Element, {
      //     target: { files: [file] },
      //   })
      // )
    }
  )
})
