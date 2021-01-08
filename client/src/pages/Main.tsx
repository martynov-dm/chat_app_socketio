import React, { useContext, useEffect } from 'react'
import MainWindow from '../components/MainWindow/MainWindow'
import Sidebar from '../components/Sidebar/Sidebar'
import { css } from '@emotion/react'
import SidebarHeader from '../components/SidebarHeader/SidebarHeader'
import RoomHeader from '../components/RoomHeader/RoomHeader'
import { SocketContext } from '../socket.io/socket'
import ServersList from '../components/ServersList/ServersList'

const Main: React.FC = () => {
  const ws = useContext(SocketContext)

  useEffect(() => {
    ws.joinServer()
  }, [])

  return (
    <main
      css={css`
        margin: auto;
        width: 100vw;
        height: 100vh;

        display: grid;
        grid-template-columns: minmax(5.5rem, 5%) minmax(14rem, 14%) 1fr;
        grid-template-rows: minmax(3rem, 7%) 1fr;
      `}
    >
      <SidebarHeader />
      <Sidebar />

      <RoomHeader />
      <MainWindow />

      <ServersList />
    </main>
  )
}

export default Main
