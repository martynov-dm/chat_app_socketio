import React from 'react'
import { css } from '@emotion/react'
import ServerItem from './ServerItem/ServerItem'

const ServersList = () => {
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
      <ServerItem />
      <ServerItem />
      <ServerItem />
    </aside>
  )
}

export default ServersList
