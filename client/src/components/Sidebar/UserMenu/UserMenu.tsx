import { Avatar, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useSelector } from 'react-redux'
// import { css } from '@emotion/react'

import {
  selectUserLogin,
  selectUserAvatar,
} from '../../../redux/auth/auth.selectors'

const UserMenu = (props: any) => {
  const bgColor = useColorModeValue('gray.200', 'gray.900')
  const login = useSelector(selectUserLogin)
  const avatar = useSelector(selectUserAvatar)

  return (
    <Flex
      mt='auto'
      h='3.5rem'
      bg={bgColor}
      align='center'
      justify='space-evenly'
    >
      <Avatar name={login} src={avatar} />
      <Text fontSize='md'>{login}</Text>
    </Flex>
  )
}

export default UserMenu
