import React from 'react'
import styled from 'styled-components'
import CreateServer from './CreateServer/CreateServer'
import RoomList from './RoomList/RoomList'
import UserHeader from './UserHeader/UserHeader'
import { css } from '@emotion/react'
import { useColorModeValue } from '@chakra-ui/react'

// const SidebarLayout = styled.aside`
//   flex: none;
//   width: 18rem;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   border-right: 1px solid rgba(0, 0, 0, 0.1);
//   background: #ffffff;
// `

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('#EDF2F7', '#1A202C')

  return (
    <aside
      css={css`
        grid-column: 1/2;
        grid-row: 2/3;
        height: 100%;
        width: 100%;

        background-color: ${bgColor};
      `}
    >
      <div>Sidebar</div>
      {/* <UserHeader />
      <RoomList />
      <CreateServer /> */}
    </aside>
  )
}

export default Sidebar
