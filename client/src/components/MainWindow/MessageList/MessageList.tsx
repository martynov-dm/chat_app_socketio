import React from 'react'
import { useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import { css } from '@emotion/react'

import { selectMessagesArr } from '../../../redux/messages/messages.selectors'

const MessageList = () => {
  const messages = useSelector(selectMessagesArr)

  return (
    <section
      css={css`
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column-reverse;

        flex-grow: 1;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
      `}
    >
      {messages.map((message, index) => {
        return <MessageItem key={index} message={message} />
      })}
    </section>
  )
}

export default MessageList
