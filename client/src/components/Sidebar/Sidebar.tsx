import React from 'react'
import RoomList from './RoomList/RoomList'
import { css } from '@emotion/react'
import { Box, Heading, useColorModeValue } from '@chakra-ui/react'
import UserMenu from './UserMenu/UserMenu'

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('#EDF2F7', '#2D3748')

  return (
    <aside
      css={css`
        grid-column: 2/3;
        grid-row: 2/3;
        height: 100%;
        width: 100%;

        background-color: ${bgColor};

        display: flex;
        flex-direction: column;
      `}
    >
      <Box ml='1rem' mt='0.65rem'>
        <Heading as='h3' size='lg'>
          Rooms
        </Heading>
      </Box>

      <RoomList />

      <UserMenu />
    </aside>
  )
}

export default Sidebar
