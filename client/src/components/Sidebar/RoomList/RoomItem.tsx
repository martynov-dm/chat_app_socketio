import React, { useContext } from 'react'
import { css } from '@emotion/react'
import { Flex, Text } from '@chakra-ui/react'
import { LockIcon, Icon } from '@chakra-ui/icons'
import { MdPublic } from 'react-icons/md'
import { SocketContext } from '../../../socket.io/socket'

interface Iprops {
  title: string
  namespace: string
  isPrivate: boolean
}

const RoomItem: React.FC<Iprops> = (props) => {
  const { title, namespace, isPrivate } = props
  const ws = useContext(SocketContext)

  return (
    <>
      <Flex
        onClick={() => {
          ws.joinRoom(title)
        }}
        mt='1rem'
        align='center'
        justify='evenly'
        css={css`
          cursor: pointer;
        `}
      >
        {isPrivate ? <LockIcon /> : <Icon as={MdPublic} />}{' '}
        <Text ml='0.7rem'>{title}</Text>
      </Flex>
    </>
  )
}

export default RoomItem
