import { Image } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { css } from '@emotion/react'
import { SocketContext } from '../../../socket.io/socket'

interface Iprops {
  image: string
  endpoint: string
}

const ServerItem: React.FC<Iprops> = (props) => {
  const { image, endpoint } = props
  const ws = useContext(SocketContext)

  return (
    <Image
      css={css`
        cursor: pointer;
      `}
      mt='1rem'
      borderRadius='lg'
      boxSize='4rem'
      objectFit='cover'
      src={image}
      alt='Server Image'
      onClick={() => ws.joinNs(endpoint)}
    />
  )
}

export default ServerItem
