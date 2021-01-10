import React from 'react'
import { css } from '@emotion/react'
import {
  Flex,
  Heading,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { IconButton } from '@chakra-ui/react'
import { CgAddR } from 'react-icons/cg'
import { Icon } from '@chakra-ui/react'

import RoomList from './RoomList/RoomList'
import UserMenu from './UserMenu/UserMenu'
import { selectCurrentServerType } from '../../redux/serverRoomMessage/serverRoomMessage.selectors'
import Modal from '../common/Modal'

const Sidebar: React.FC = () => {
  const bgColor = useColorModeValue('#EDF2F7', '#2D3748')
  const serverType = useSelector(selectCurrentServerType)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <aside
      css={css`
        grid-column: 2/3;
        grid-row: 2/3;
        height: 100%;
        width: 100%;

        background-color: ${bgColor};

        display: flex;
        flex-direction: column;
      `}
    >
      <Flex ml='1rem' mt='0.65rem'>
        <Heading as='h3' size='lg'>
          Rooms
        </Heading>
        {serverType === 'public' && (
          <>
            <IconButton
              onClick={onOpen}
              ref={finalRef}
              ml='2.5rem'
              mt='0.1rem'
              aria-label='Search database'
              icon={<Icon w='1.6rem' h='1.6rem' as={CgAddR} />}
            />

            <Modal
              initialRef={initialRef}
              finalRef={finalRef}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
            />
          </>
        )}
      </Flex>

      <RoomList />

      <UserMenu />
    </aside>
  )
}

export default Sidebar
