import React from 'react'
import styled from 'styled-components'
import RoomItem from './RoomItem'

const RoomListStyles = styled.section`
  padding-left: 3.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2rem 0;
`

const RoomList = () => {
  return (
    <RoomListStyles>
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
    </RoomListStyles>
  )
}

export default RoomList
