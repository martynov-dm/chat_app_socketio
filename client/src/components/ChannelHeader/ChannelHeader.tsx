import React from 'react'
import { css } from '@emotion/react'
import ThemeToggler from '../common/ThemeToggler'
import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'

const ChannelHeader = (props: any) => {
  const bgColor = useColorModeValue('#FFFFFF', '#2D3748')
  // const peopleCount = useSelector(peopleInTheRoom)
  // const currentRoomName = useSelector(selectCurrentRoomName)

  return (
    <header
      css={css`
        grid-column: 3/4;
        grid-row: 1/2;

        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        z-index: 1;

        background-color: ${bgColor};
        &:after {
          display: block;
          content: '.';
          font-size: 0;
          color: transparent;
          height: 7px;
          width: 100%;
          padding-left: 4px;
          position: absolute;
          bottom: -7px;
          left: -4px;
          box-shadow: inset 0px 7px 6px -6px rgba(0, 0, 0, 0.25);
        }
      `}
    >
      <Text>Room Name</Text>
      <ThemeToggler />

      <Flex>
        <Icon as={BsFillPeopleFill} />
        <Text>12</Text>
      </Flex>
    </header>
  )
}

export default ChannelHeader

// import React from 'react'
// import styled from 'styled-components'
// import { BsFillPeopleFill } from 'react-icons/bs'
// import { css } from '@emotion/react'
// import ThemeToggler from '../../common/ThemeToggler'

// const RoomTitleStyles = styled.div`
//   font-size: 1.38rem;
//   color: rgba(23, 26, 42, 0.7);
//   justify-self: end;
// `
// const RoomPeopleStyles = styled.button`
//   width: 3.3rem;
//   height: 2.2rem;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   color: rgba(23, 26, 42, 0.7);
//   background-color: #fff;

//   svg {
//     fill: rgba(23, 26, 42, 0.7);

//     width: 1.2rem;
//     height: 1.2rem;
//   }
// `

// const RoomHeader = () => {
//   return (
//     <header
//       css={css`
//         box-shadow: 0px 7px 16px 0px rgba(0, 0, 0, 0.71);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         padding: 0.62rem;
//         height: 4.8rem;
//         width: 100%;
//       `}
//     >
//       <div style={{ flexGrow: 1 }}></div>
//       <RoomTitleStyles>
//         <h1># general</h1>
//       </RoomTitleStyles>
//       <div style={{ flexGrow: 1 }}></div>

//       <ThemeToggler />
//     </header>
//   )
// }

// export default RoomHeader

// import React from 'react'
// import { css } from '@emotion/react'

// const UserHeader: React.FC = () => {
//   return (
//     <header
//       css={css`
//         box-shadow: 0px 7px 16px 0px rgba(0, 0, 0, 0.71);
//         z-index: 1;
//         display: flex;
//         align-items: center;
//         padding: 1rem;
//         height: 4.8rem;
//         color: rgba(23, 26, 42, 0.7);
//         font-weight: normal;
//       `}
//     >
//       <div>
//         <h3>Dmitrii</h3>
//       </div>
//     </header>
//   )
// }

// export default UserHeader
