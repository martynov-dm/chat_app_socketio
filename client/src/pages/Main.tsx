import React from 'react'
import MainWindow from '../components/MainWindow/MainWindow'
import Sidebar from '../components/Sidebar/Sidebar'
import styled from 'styled-components'
import { css } from '@emotion/react'
import SidebarHeader from '../components/SidebarHeader/SidebarHeader'
import ChannelHeader from '../components/ChannelHeader/ChannelHeader'

const Main: React.FC = () => {
  return (
    <>
      <main
        css={css`
          margin: auto;
          width: 100vw;
          height: 100vh;

          display: grid;
          grid-template-columns: minmax(10rem, 20%) 1fr;
          grid-template-rows: minmax(3rem, 7%) 1fr;
        `}
      >
        <SidebarHeader />
        <Sidebar />

        <ChannelHeader />
        <MainWindow />
      </main>
    </>
  )
}

export default Main
