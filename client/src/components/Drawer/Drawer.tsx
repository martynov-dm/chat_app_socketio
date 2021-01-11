import {
  Avatar,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Icon,
  IconButton,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { css } from '@emotion/react'
import React, { RefObject } from 'react'
import { useSelector } from 'react-redux'
import { CgAddR } from 'react-icons/cg'

import ServerItem from '../../components/ServersList/ServerItem/ServerItem'
import {
  selectUserLogin,
  selectUserAvatar,
} from '../../redux/auth/auth.selectors'
import {
  selectCurrentServerTitle,
  selectServersArr,
  selectRoomsArr,
  selectCurrentServerType,
} from '../../redux/serverRoomMessage/serverRoomMessage.selectors'
import RoomItem from '../Sidebar/RoomList/RoomItem'
import Modal from '../common/Modal'

interface Iprops {
  btnRef: React.RefObject<HTMLElement>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const DrawerComponent = (props: Iprops) => {
  const { btnRef, isOpen, onClose } = props
  const serversBg = useColorModeValue('#A0AEC0', '#171923')
  const userMenuColor = useColorModeValue('gray.200', 'gray.800')

  const serverTitle = useSelector(selectCurrentServerTitle)
  const serversArr = useSelector(selectServersArr)
  const currentRoomsArr = useSelector(selectRoomsArr)
  const login = useSelector(selectUserLogin)
  const avatar = useSelector(selectUserAvatar)

  const serverType = useSelector(selectCurrentServerType)
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 7rem;
                height: 100vh;
                background-color: ${serversBg};
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
            </div>
            <div
              css={css`
                display: flex;
                flex-direction: column;
                width: 100%;
              `}
            >
              <DrawerCloseButton />
              <Heading as='h3' size='lg' ml='2rem' mt='0.5rem'>
                {serverTitle}
              </Heading>

              {serverType === 'public' && (
                <>
                  <IconButton
                    mt='1rem'
                    mx='auto'
                    width='5rem'
                    onClick={onModalOpen}
                    ref={finalRef}
                    aria-label='Search database'
                    icon={<Icon w='1.6rem' h='1.6rem' as={CgAddR} />}
                  />

                  <Modal
                    initialRef={initialRef}
                    finalRef={finalRef}
                    isOpen={isModalOpen}
                    onOpen={onModalOpen}
                    onClose={onModalClose}
                  />
                </>
              )}

              <div
                css={css`
                  width: 95%;
                  height: 50rem;
                  margin-left: 0.5rem;
                  margin-top: 1rem;
                  overflow-y: auto;
                `}
              >
                {currentRoomsArr &&
                  currentRoomsArr.map((room) => (
                    <RoomItem
                      key={room._id}
                      roomId={room._id}
                      title={room.roomTitle}
                    />
                  ))}
              </div>

              <Flex
                mt='auto'
                shrink={1}
                h='4rem'
                bg={userMenuColor}
                align='center'
              >
                <Avatar ml='1.5rem' name={login} src={avatar} />
                <Heading ml='1.5rem' as='h4' size='md'>
                  {login}
                </Heading>
              </Flex>
            </div>

            {/* <DrawerHeader>Create your account</DrawerHeader> */}

            {/* <DrawerFooter>footer</DrawerFooter> */}
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default DrawerComponent
