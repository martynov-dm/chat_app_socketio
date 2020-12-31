import { Image } from '@chakra-ui/react'
import React from 'react'
import { css } from '@emotion/react'
import { useDispatch } from 'react-redux'
import { serversActions } from '../../../redux/servers/servers.actions'

interface Iprops {
  image: string
  endpoint: string
}

const ServerItem: React.FC<Iprops> = (props) => {
  const { image, endpoint } = props
  const dispatch = useDispatch()

  return (
    <Image
      css={css`
        cursor: pointer;
      `}
      mt='1rem'
      borderRadius='lg'
      boxSize='3rem'
      objectFit='cover'
      src={image}
      alt='Server Image'
      onClick={() => dispatch(serversActions.updateCurrentServer(endpoint))}
    />
  )
}

export default ServerItem
