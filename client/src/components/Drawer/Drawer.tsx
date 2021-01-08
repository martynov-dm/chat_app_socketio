import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import React from 'react'

interface Iprops {
  btnRef: any
  isOpen: any
  onOpen: any
  onClose: any
}

const DrawerComponent = (props: Iprops) => {
  const { btnRef, isOpen, onClose } = props

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Create your account</DrawerHeader>

            <DrawerBody>dick - content</DrawerBody>

            <DrawerFooter>footer</DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default DrawerComponent
