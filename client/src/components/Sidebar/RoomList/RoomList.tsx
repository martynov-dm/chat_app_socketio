import React from 'react'
import styled from 'styled-components'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectRoomsArr } from '../../../redux/rooms/rooms.selectors'

const RoomList = () => {
  const rooms = useSelector(selectRoomsArr)

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2.5rem;
      `}
    >
      {rooms.map((room) => (
        <RoomItem
          key={room.roomId}
          title={room.roomTitle}
          namespace={room.namespace}
          isPrivate={room.isPrivate}
        />
      ))}
    </section>
  )
}

export default RoomList
