import React, { useContext, useState } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import { Flex, Input, useColorModeValue } from '@chakra-ui/react'
import { css } from '@emotion/react'
import { SocketContext } from '../../../socket.io/socket'
import { useSelector } from 'react-redux'
import { selectUserId } from '../../../redux/auth/auth.selectors'
import { selectCurrentRoomId } from '../../../redux/serverRoomMessage/serverRoomMessage.selectors'

// svg {
//   width: 2rem;
//   height: 2rem;
//   fill: #006eff;
//   margin-right: 2rem;
// }

// button {
//   position: relative;
//   border: 0;
//   background: #fff;
//   padding: 0;
//   cursor: pointer;
// }

// input:first-child {
//   flex: 1 1 100%;
//   padding: 1rem;
//   border: 0;
//   font-size: 1rem;
// }

const MessageInput: React.FC = () => {
  const bgColor = useColorModeValue('gray.200', 'gray.800')
  const inputColor = useColorModeValue('#FFFFFF', '#2D3748')
  const ws = useContext(SocketContext)
  const userId = useSelector(selectUserId)
  const roomId = useSelector(selectCurrentRoomId)
  const [message, setMessage] = useState('')

  const handleMessageSubmit = () => {
    ws.sendMessage(message, userId, roomId)
    setMessage('')
  }

  const handleKeyDown = (event: any) => {
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
        `}
      />
    </Flex>
  )
}

export default MessageInput
