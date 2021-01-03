import React from 'react'
import { css } from '@emotion/react'
import ServerItem from './ServerItem/ServerItem'
import { useSelector } from 'react-redux'
import { selectServersArr } from '../../redux/serverRoomMessage/serverRoomMessage.selectors'

const ServersList = () => {
  const serversArr = useSelector(selectServersArr)
  return (
    <aside
      css={css`
        grid-column: 1/2;
        grid-row: 1/3;

        display: flex;
        flex-direction: column;
        align-items: center;
      `}
    >
      {serversArr.map((server) => (
        <ServerItem
          key={server._id}
          image={server.image}
          endpoint={server.endpoint}
        />
      ))}
    </aside>
  )
}

export default ServersList
