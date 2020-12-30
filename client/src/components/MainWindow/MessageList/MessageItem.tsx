import { Box, Image, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import styled from 'styled-components'

interface Iprops {
  avatar: string
  username: string
  time: Date
  text: string
}

const MessageItem = (props: Iprops) => {
  const { avatar, username, time, text } = props
  const convertedDate = new Date(time).toLocaleString()

  return (
    <div
      css={css`
        padding: 0.2rem;
        display: flex;
        width: 100%;
        min-height: 3rem;
        align-items: center;

        .text {
          margin-left: 1rem;
          display: flex;
          flex-direction: column;

          .message {
            line-height: 1.4rem;
            white-space: pre-wrap;
            color: #171a2a;
            font-size: 1.1rem;
          }

          .name-date {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 0.3rem;
            color: rgba(23, 26, 42, 0.7);
            .date {
              margin-left: 0.7rem;
            }
          }
        }
      `}
    >
      <Box>
        <Image width='2.5rem' borderRadius='50%' src={avatar} alt='ava' />
      </Box>
      <div className='text'>
        <div className='name-date'>
          <Text className='name'>{username}</Text>
          <Text className='date'>{convertedDate}</Text>
        </div>

        <Text className='message'>{text}</Text>
      </div>
    </div>
  )
}

export default MessageItem
