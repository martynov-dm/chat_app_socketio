import React from 'react'
import MainWindow from '../components/MainWindow/MainWindow'
import Sidebar from '../components/Sidebar/Sidebar'
import styled from 'styled-components'

const Main: React.FC = () => {
  const MainPageLayout = styled.main`
    display: flex;
    margin: auto;
    width: 100%;
    height: 100%;
    background: #fff;
    overflow: hidden;
  `

  return (
    <>
      <MainPageLayout>
        <Sidebar />
        <MainWindow />
      </MainPageLayout>
    </>
  )
}

export default Main
