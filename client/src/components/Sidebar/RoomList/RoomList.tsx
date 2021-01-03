import React from 'react'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectRoomsArrFromServer } from '../../../redux/serverRoomMessage/serverRoomMessage.selectors'

const RoomList = () => {
  const currentRoomsArr = useSelector(selectRoomsArrFromServer)

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2.5rem;
      `}
    >
      {currentRoomsArr &&
        currentRoomsArr.map((room) => (
          <RoomItem key={room._id} title={room.roomTitle} />
        ))}
    </section>
  )
}

export default RoomList
