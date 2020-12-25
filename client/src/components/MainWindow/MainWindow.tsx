import React from 'react'

import styled from 'styled-components'
import RoomHeader from './RoomHeader/RoomHeader'
import MessageList from './MessageList/MessageList'
import CreateMessageForm from './CreateMessageForm/CreateMessageForm'

const MessagesSectionLayout = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`

const MainWindow = () => {
  return (
    <MessagesSectionLayout>
      <RoomHeader />
      <MessageList />
      <CreateMessageForm />
    </MessagesSectionLayout>
  )
}

export default MainWindow
