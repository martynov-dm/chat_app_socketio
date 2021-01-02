import React from 'react'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectCurrentRoomsArr } from '../../../redux/rooms/rooms.selectors'

const RoomList = () => {
  const currentRoomsArr = useSelector(selectCurrentRoomsArr)

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2.5rem;
      `}
    >
      {currentRoomsArr.length !== 0 &&
        currentRoomsArr.map((room) => (
          <RoomItem key={room._id} title={room.roomTitle} />
        ))}
    </section>
  )
}

export default RoomList
