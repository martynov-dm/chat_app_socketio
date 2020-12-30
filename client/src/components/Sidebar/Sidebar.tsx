import React from 'react'
import styled from 'styled-components'
import CreateServer from './CreateServer/CreateServer'
import RoomList from './RoomList/RoomList'
import { css } from '@emotion/react'
import { useColorModeValue } from '@chakra-ui/react'
import UserMenu from './UserMenu/UserMenu'

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('#EDF2F7', '#1A202C')

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
      <div>Sidebar</div>
      <UserMenu />

      {/* <UserHeader />
      <RoomList />
      <CreateServer /> */}
    </aside>
  )
}

export default Sidebar
