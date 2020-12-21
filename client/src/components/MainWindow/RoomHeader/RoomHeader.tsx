import React from 'react'
import styled from 'styled-components'
import { BsFillPeopleFill } from 'react-icons/bs'

const RoomHeaderStyles = styled.header`
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.62rem;
  height: 4.8rem;
  width: 100%;
`

const RoomTitleStyles = styled.div`
  font-size: 1.38rem;
  color: rgba(0, 0, 0, 0.62);
  justify-self: end;
`
const RoomPeopleStyles = styled.button`
  width: 2.7rem;
  height: 2.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const RoomHeader = () => {
  return (
    <RoomHeaderStyles>
      <div style={{ flexGrow: 1 }}></div>
      <RoomTitleStyles>
        <h1># general</h1>
      </RoomTitleStyles>
      <div style={{ flexGrow: 1 }}></div>
      <RoomPeopleStyles>
        <div>19</div>
        <div>
          <BsFillPeopleFill />
        </div>
      </RoomPeopleStyles>
    </RoomHeaderStyles>
  )
}

export default RoomHeader
