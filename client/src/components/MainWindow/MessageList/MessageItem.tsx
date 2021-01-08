import { Box, Heading, Image, Text } from '@chakra-ui/react'
import { css } from '@emotion/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserLogin } from '../../../redux/auth/auth.selectors'

interface Iprops {
  avatar: string
  username: string
  time: Date | string
  text: string
}

const MessageItem = (props: Iprops) => {
  const { avatar, username, time, text } = props
  const convertedDate = new Date(time).toLocaleString()
  const currentUserLogin = useSelector(selectUserLogin)

  return (
    <Box
      boxShadow='base'
      borderWidth='1px'
      borderRadius='lg'
      maxWidth='35rem'
      my='1rem'
      css={css`
        padding: 0.2rem;
        display: flex;
        width: 100%;
        min-height: 4.5rem;
        align-self: ${currentUserLogin === username
          ? 'flex-end'
          : 'flex-start'};
        align-items: center;

        .text {
          margin-left: 1rem;
          display: flex;
          flex-direction: column;

          .message {
            line-height: 1.4rem;
            white-space: pre-wrap;

            font-size: 1.1rem;
          }

          .name-date {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin-bottom: 0.3rem;

            .date {
              margin-left: 0.7rem;
              font-size: 0.8rem;
            }
          }
        }
      `}
    >
      <Box ml='1rem'>
        <Image width='3rem' borderRadius='50%' src={avatar} alt='ava' />
      </Box>
      <div className='text'>
        <div className='name-date'>
          <Heading as='h5' size='sm' className='name'>
            {username}
          </Heading>
          <Text className='date'>{convertedDate}</Text>
        </div>

        <Text className='message'>{text}</Text>
      </div>
    </Box>
  )
}

export default MessageItem
