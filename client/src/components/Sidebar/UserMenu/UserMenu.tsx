import { Flex, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { css } from '@emotion/react'

const UserMenu = (props: any) => {
  const bgColor = useColorModeValue('gray.200', 'gray.900')

  return (
    <Flex mt='auto' h='4rem' bg={bgColor} boxShadow='2xl'>
      UserMenu
    </Flex>
  )
}

export default UserMenu
