import { Avatar, Flex, Heading, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
import { css } from '@emotion/react'

import {
  selectUserLogin,
  selectUserAvatar,
} from '../../../redux/auth/auth.selectors'

const UserMenu = (props: any) => {
  const bgColor = useColorModeValue('gray.200', 'gray.800')
  const login = useSelector(selectUserLogin)
  const avatar = useSelector(selectUserAvatar)

  return (
    <Flex
      mt='auto'
      shrink={1}
      h='4rem'
      bg={bgColor}
      align='center'
      justify='space-evenly'
    >
      <Avatar name={login} src={avatar} />
      <Heading as='h4' size='md'>
        {login}
      </Heading>
    </Flex>
  )
}

export default UserMenu
