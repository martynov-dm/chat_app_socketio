import React from 'react'
import { useSelector } from 'react-redux'
import MessageItem from './MessageItem'
import { css } from '@emotion/react'
import { selectCurrentRoomMessages } from '../../../redux/serverRoomMessage/serverRoomMessage.selectors'

const MessageList = () => {
  const currentRoomMessages = useSelector(selectCurrentRoomMessages)

  return (
    <section
      css={css`
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column-reverse;
        height: 100%;
        overflow-y: scroll;

        /* -webkit-overflow-scrolling: touch; */
      `}
    >
      {currentRoomMessages &&
        currentRoomMessages.map((message) => {
          return (
            <MessageItem
              key={message._id}
              avatar={message.user.avatar}
              username={message.user.login}
              time={message.createdAt}
              text={message.text}
            />
          )
        })}
    </section>
  )
}

export default MessageList
