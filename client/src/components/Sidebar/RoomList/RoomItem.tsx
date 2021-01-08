import React, { useContext } from 'react'
import { css } from '@emotion/react'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { FaSlackHash } from 'react-icons/fa'
import { Icon } from '@chakra-ui/react'

import { selectUserId } from '../../../redux/auth/auth.selectors'
import { SocketContext } from '../../../socket.io/socket'

interface Iprops {
  title: string
  roomId: string
}

const RoomItem: React.FC<Iprops> = (props) => {
  const { title, roomId } = props
  const ws = useContext(SocketContext)
  const hoverColor = useColorModeValue('#F7FAFC', '#4A5568')
  // const bgColor = useColorModeValue('#EDF2F7', '#2D3748')
  return (
    <>
      <Flex
        mr='0.2rem'
        p='0.2rem'
        borderRadius='lg'
        onClick={() => {
          ws.joinRoom(roomId)
        }}
        my='0.3rem'
        align='center'
        justify='evenly'
        css={css`
          cursor: pointer;
          &:hover {
            background-color: ${hoverColor};
          }
        `}
      >
        <Icon as={FaSlackHash} />
        <Text fontSize='lg' ml='0.7rem'>
          {title}
        </Text>
      </Flex>
    </>
  )
}

export default RoomItem
