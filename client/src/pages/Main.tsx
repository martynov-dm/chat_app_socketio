import React, { useContext, useEffect } from 'react'
import MainWindow from '../components/MainWindow/MainWindow'
import Sidebar from '../components/Sidebar/Sidebar'
import { css } from '@emotion/react'
import SidebarHeader from '../components/SidebarHeader/SidebarHeader'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import { SocketContext } from '../socket.io/socket'
import ServersList from '../components/ServersList/ServersList'
import { useBreakpointValue } from '@chakra-ui/react'

const Main: React.FC = () => {
  const ws = useContext(SocketContext)
  const variant = useBreakpointValue({
    base: '0 0 1fr',
    md: 'minmax(5.5rem, 5%) minmax(17rem, 14%) 1fr',
  })
  useEffect(() => {
    ws.auth()
  }, [ws])

  return (
    <main
      css={css`
        margin: auto;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: grid;
        grid-template-columns: ${variant};
        grid-template-rows: minmax(3rem, 6%) 1fr;
      `}
    >
      <ServersList />
      <SidebarHeader />
      <Sidebar />

      <RoomHeader />
      <MainWindow />
    </main>
  )
}

export default Main
