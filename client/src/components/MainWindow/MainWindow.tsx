import React from 'react'
import { css } from '@emotion/react'

import styled from 'styled-components'
import MessageList from './MessageList/MessageList'
import CreateMessageForm from './CreateMessageForm/CreateMessageForm'
import { useColorModeValue } from '@chakra-ui/react'

const MainWindow = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#2D3748')

  return (
    <section
      css={css`
        grid-column: 3/4;
        grid-row: 2/3;

        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        background-color: ${bgColor};
      `}
    >
      <MessageList />
      <CreateMessageForm />
    </section>
  )
}

export default MainWindow
