import React from 'react'
import MainWindow from '../components/MainWindow/MainWindow'
import Sidebar from '../components/Sidebar/Sidebar'
import { css } from '@emotion/react'
import SidebarHeader from '../components/SidebarHeader/SidebarHeader'
import ChannelHeader from '../components/ChannelHeader/ChannelHeader'
import { SocketProvider } from '../socket.io/socket'
import ServersList from '../components/ServersList/ServersList'

const Main: React.FC = () => {
  return (
    <main
      css={css`
        margin: auto;
        width: 100vw;
        height: 100vh;

        display: grid;
        grid-template-columns: minmax(4rem, 10%) minmax(12rem, 18%) 1fr;
        grid-template-rows: minmax(3rem, 7%) 1fr;
      `}
    >
      <SocketProvider>
        <SidebarHeader />
        <Sidebar />

        <ChannelHeader />
        <MainWindow />

        <ServersList />
      </SocketProvider>
    </main>
  )
}

export default Main
