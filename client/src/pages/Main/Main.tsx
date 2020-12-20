import React from 'react'
import MainWindow from '../../components/MainWindow/MainWindow'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Main.scss'

const Main = () => {
  return (
    <>
      <div className='main-layout'>
        <Sidebar />
        <MainWindow />
      </div>
    </>
  )
}

export default Main
