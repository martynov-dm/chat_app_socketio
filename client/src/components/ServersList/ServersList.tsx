import React from 'react'
import { css } from '@emotion/react'
import ServerItem from './ServerItem/ServerItem'
import { useSelector } from 'react-redux'
import { selectServersArr } from '../../redux/serverRoomMessage/serverRoomMessage.selectors'
import { useColorModeValue } from '@chakra-ui/react'

const ServersList = () => {
  const serversArr = useSelector(selectServersArr)
  const bgColor = useColorModeValue('#A0AEC0', '#171923')
  return (
    <aside
      css={css`
        grid-column: 1/2;
        grid-row: 1/3;

        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: ${bgColor};
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
