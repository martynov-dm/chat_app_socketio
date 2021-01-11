import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { SocketContext } from '../../socket.io/socket'

interface IProps {
  initialRef: React.RefObject<HTMLInputElement>
  finalRef: React.RefObject<HTMLElement>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Modal: React.FC<IProps> = (props) => {
  const { initialRef, finalRef, isOpen, onClose } = props
  const [groupName, setGroupName] = useState('')
  const ws = useContext(SocketContext)

  const handleSave = () => {
    ws.addRoom(groupName)
    setGroupName('')
    onClose()
  }

  return (
    <>
      <ChakraModal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new room</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Room name</FormLabel>
              <Input
                onChange={(e) => setGroupName(e.currentTarget.value)}
                ref={initialRef}
                placeholder='Room name'
                value={groupName}
                maxLength={20}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={handleSave} colorScheme='blue' mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    </>
  )
}

export default Modal
