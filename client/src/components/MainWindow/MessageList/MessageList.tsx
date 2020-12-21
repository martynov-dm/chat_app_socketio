import React from 'react'
import styled from 'styled-components'
import MessageItem from './MessageItem'

const MessageListStyles = styled.section`
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column-reverse;

  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const MessageList = () => {
  return (
    <MessageListStyles>
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
      <MessageItem />
    </MessageListStyles>
  )
}

export default MessageList
