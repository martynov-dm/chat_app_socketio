import React from 'react'
import styled from 'styled-components'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'

const RoomListStyles = styled.section`
  padding-left: 3.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 2rem 0;
`

const RoomList = () => {
  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2.5rem;
      `}
    >
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
      <RoomItem />
    </section>
  )
}

export default RoomList
