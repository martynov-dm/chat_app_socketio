import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { configureStore, history } from '../redux/store'
import { ChakraProvider } from '@chakra-ui/react'
import { SocketProvider } from '../socket.io/socket'

const store = configureStore()

const Wrapper: FC = ({ children }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ChakraProvider>
          <ConnectedRouter history={history}>
            <SocketProvider>{children}</SocketProvider>
          </ConnectedRouter>
        </ChakraProvider>
      </ConnectedRouter>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>
) => render(ui, { wrapper: Wrapper, ...options })

export * from '@testing-library/react'
export { customRender as render }
