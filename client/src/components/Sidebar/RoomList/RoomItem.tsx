import React, { useContext } from 'react'
import { css } from '@emotion/react'
import { Flex, Text } from '@chakra-ui/react'

import { SocketContext } from '../../../socket.io/socket'

interface Iprops {
  title: string
  roomId: string
}

const RoomItem: React.FC<Iprops> = (props) => {
  const { title, roomId } = props
  const ws = useContext(SocketContext)

  return (
    <>
      <Flex
        onClick={() => {
          ws.joinRoom(roomId)
        }}
        mt='1rem'
        align='center'
        justify='evenly'
        css={css`
          cursor: pointer;
        `}
      >
        <Text ml='0.7rem'># {title}</Text>
      </Flex>
    </>
  )
}

export default RoomItem
