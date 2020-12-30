import { Image } from '@chakra-ui/react'
import React from 'react'
import { css } from '@emotion/react'

interface Iprops {
  image: string
  endpoint: string
}

const ServerItem: React.FC<Iprops> = (props) => {
  const { image, endpoint } = props
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
      onClick={() => console.log(endpoint)}
    />
  )
}

export default ServerItem
