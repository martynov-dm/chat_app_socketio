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

interface IProps {
  initialRef: React.RefObject<HTMLInputElement>
  finalRef: React.RefObject<HTMLElement>
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const Modal: React.FC<IProps> = (props) => {
  const { initialRef, finalRef, isOpen, onClose } = props

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
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder='First name' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
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
