import React from 'react'
import { css } from '@emotion/react'

import MessageList from './MessageList/MessageList'
import MessageInput from './MessageInput/MessageInput'
import { useColorModeValue } from '@chakra-ui/react'

const MainWindow = () => {
  const bgColor = useColorModeValue('#FFFFFF', '#4A5568')

  return (
    <section
      css={css`
        grid-column: 3/4;
        grid-row: 2/3;
        height: 100%;
        overflow: hidden;
        width: 100%;
        display: flex;
        flex-direction: column;
        position: relative;

        background-color: ${bgColor};
      `}
    >
      <MessageList />
      <MessageInput />
    </section>
  )
}

export default MainWindow
