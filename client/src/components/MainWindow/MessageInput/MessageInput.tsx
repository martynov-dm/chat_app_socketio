import React, { useContext, useState } from 'react'
import { RiSendPlane2Fill } from 'react-icons/ri'
import {
  Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import { SocketContext } from '../../../socket.io/socket'

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
  const bgColor = useColorModeValue('gray.200', 'gray.900')
  const [message, setMessage] = useState('')
  const ws = useContext(SocketContext)

  const handleMessageSubmit = () => {
    ws.sendMessage(message)
    setMessage('')
  }

  return (
    <Flex
      align='center'
      justify='space-evenly'
      mt='5'
      h='4rem'
      bg={bgColor}
      boxShadow='2xl'
    >
      <Input
        borderRadius='xl'
        width='70%'
        value={message}
        onChange={(e) => setMessage(e.currentTarget.value)}
      />
      <RiSendPlane2Fill
        onClick={handleMessageSubmit}
        css={css`
          width: 1.65rem;
          height: 1.65rem;

          cursor: pointer;
        `}
      />
    </Flex>
  )
}

export default MessageInput
