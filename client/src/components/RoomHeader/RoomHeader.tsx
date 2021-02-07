import React from 'react'
import { css } from '@emotion/react'
import ThemeToggler from '../common/ThemeToggler'
import {
  Avatar,
  Heading,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { Icon } from '@chakra-ui/react'
import { BsFillPeopleFill } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  selectCurrentRoomName,
  selectCurrentRoomUserCount,
  selectUsersArr,
} from '../../redux/serverRoomMessage/serverRoomMessage.selectors'
import Drawer from '../Drawer/Drawer'
import { useMediaQuery } from '@material-ui/core'

const RoomHeader = () => {
  const bgColor = useColorModeValue('#EDF2F7', '#2D3748')
  const userCount = useSelector(selectCurrentRoomUserCount)
  const currentRoomName = useSelector(selectCurrentRoomName)
  const usersList = useSelector(selectUsersArr)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef(null)
  const isLessThan767px = useMediaQuery('(max-width: 767px)')

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
        /* justify-content: center; */

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

          box-shadow: inset 0px 7px 6px -6px rgba(0, 0, 0, 0.25);
        }
      `}
    >
      {isLessThan767px && (
        <>
          <Drawer
            btnRef={btnRef}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
          />
          <IconButton
            ref={btnRef}
            onClick={onOpen}
            ml='2rem'
            aria-label='Toggle day/night'
            icon={
              <HamburgerIcon
                w='1.6rem'
                h='1.6rem'
                css={css`
                  opacity: 1;
                `}
              />
            }
            variant='ghost'
          />
        </>
      )}

      <Heading
        as='h4'
        size='md'
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      >
        {currentRoomName}
      </Heading>
      <ThemeToggler />

      <Popover>
        <PopoverTrigger>
          <IconButton
            css={css`
              &:hover {
                opacity: 0.8;
              }
            `}
            mr='2rem'
            aria-label='Toggle day/night'
            icon={
              <>
                <Icon h='1.6rem' w='1.6rem' as={BsFillPeopleFill} />
                <Text ml='0.2rem' fontSize='xl'>
                  {userCount}
                </Text>
              </>
            }
            variant='ghost'
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Users list</PopoverHeader>
          {usersList.map((user) => {
            return (
              <PopoverBody
                key={user._id}
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <Avatar size='md' name={user.login} src={user.avatar} />
                <Text ml='2rem' fontSize='lg'>
                  {user.login}
                </Text>
              </PopoverBody>
            )
          })}
        </PopoverContent>
      </Popover>
    </header>
  )
}

export default React.memo(RoomHeader)
