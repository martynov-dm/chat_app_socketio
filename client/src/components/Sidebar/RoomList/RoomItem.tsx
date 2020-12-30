import React from 'react'
import styled from 'styled-components'
import { css } from '@emotion/react'
import { Box, Text } from '@chakra-ui/react'

const RoomItemStyles = styled.section`
  font-size: 1.2rem;
  font-weight: 500;
  color: rgba(23, 26, 42, 1);
  margin: 1.35rem 0;
`

const RoomItem = () => {
  return (
    <Box mt='1rem'>
      <Text># Room</Text>
    </Box>
  )
}

export default RoomItem
