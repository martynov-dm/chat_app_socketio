import React from 'react'
import { css } from '@emotion/react'
import ServerItem from './ServerItem/ServerItem'
import { useSelector } from 'react-redux'
import { selectServersArr } from '../../redux/servers/servers.selectors'

const ServersList = () => {
  const servers = useSelector(selectServersArr)
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
      {servers.map((server, index) => (
        <ServerItem key={index} image={server.img} endpoint={server.endpoint} />
      ))}
    </aside>
  )
}

export default ServersList
