import React, { useContext, useState } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { Flex, Input, useColorModeValue } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { SocketContext } from '../../../socket.io/socket'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../redux/auth/auth.selectors'
import { selectCurrentRoomId } from '../../../redux/serverRoomMessage/serverRoomMessage.selectors'

const MessageInput: React.FC = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.800')
  const inputColor = useColorModeValue('#FFFFFF', '#2D3748')
  const ws = useContext(SocketContext)
  const userId = useSelector(selectUserId)
  const roomId = useSelector(selectCurrentRoomId)
  const [message, setMessage] = useState('')

  const handleMessageSubmit = () => {
    if (!message) {
      alert('Put some text!!')
      return
    }
    ws.sendMessage(message, userId, roomId)
    setMessage('')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleMessageSubmit()
    }
  }

  return (
    <Flex
      align='center'
      justify='center'
      shrink={0}
      h='4rem'
      bg={bgColor}
      boxShadow='2xl'
    >
      <Input
        background={inputColor}
        borderRadius='xl'
        width='70%'
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <RiSendPlane2Fill
        onClick={handleMessageSubmit}
        css={css`
          width: 1.65rem;
          height: 1.65rem;
          margin-left: 2rem;
          cursor: pointer;

          &:hover {
            opacity: 0.8;
          }
        `}
      />
    </Flex>
  )
}

export default MessageInput
