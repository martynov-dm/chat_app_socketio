import React from 'react'
import RoomItem from './RoomItem'
import { css } from '@emotion/react'
import { useSelector } from 'react-redux'
import { selectCurrentServer } from '../../../redux/servers/servers.selectors'

const RoomList = () => {
  const currentServer = useSelector(selectCurrentServer)

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
        margin-left: 2.5rem;
      `}
    >
      {Object.keys(currentServer).length !== 0 &&
        currentServer.rooms.map((room) => (
          <RoomItem
            key={room._id}
            title={room.roomTitle}
            isPrivate={room.isPrivate}
          />
        ))}
    </section>
  )
}

export default RoomList
