import React from 'react'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectRoomsArr } from '../../../redux/serverRoomMessage/serverRoomMessage.selectors'
import { useColorModeValue } from '@chakra-ui/react'

const RoomList = () => {
  const currentRoomsArr = useSelector(selectRoomsArr)

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2rem;
        margin-top: 1rem;
        width: 85%;
        height: 70vh;
        overflow-y: auto;
      `}
    >
      {currentRoomsArr &&
        currentRoomsArr.map((room) => (
          <RoomItem key={room._id} roomId={room._id} title={room.roomTitle} />
        ))}
    </section>
  )
}

export default RoomList
