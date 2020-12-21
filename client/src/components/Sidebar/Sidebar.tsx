import React from 'react'
import styled from 'styled-components'
import CreateServer from './CreateServer/CreateServer'
import RoomList from './RoomList/RoomList'
import UserHeader from './UserHeader/UserHeader'

const SidebarLayout = styled.aside`
  flex: none;
  width: 18rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
  background: #fcfcfc;
`

const Sidebar: React.FC = () => {
  return (
    <SidebarLayout>
      <UserHeader />
      <RoomList />
      <CreateServer />
    </SidebarLayout>
  )
}

export default Sidebar
