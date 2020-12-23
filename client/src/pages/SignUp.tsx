import React, { useRef, useState } from 'react'
import ThemeToggler from '../components/common/ThemeToggler'
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  CircularProgress,
  IconButton,
} from '@chakra-ui/react'
import { AttachmentIcon } from '@chakra-ui/icons'

import { useDispatch } from 'react-redux'
import { authActions } from '../redux/auth/auth.actions'

const SignUp = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [image, setFile] = useState(null as null | File)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    console.log(image)
    dispatch(authActions.signUpStart({ login, password, image }))
    setIsLoading(false)
    setLogin('')
    setPassword('')
  }

  return (
    <>
      <ThemeToggler />
      <Flex width='full' align='center' justifyContent='center'>
        <Box
          p={8}
          maxWidth='500px'
          borderWidth={1}
          borderRadius={8}
          boxShadow='lg'
        >
          <Box textAlign='center'>
            <Heading>Login</Heading>
          </Box>
          <Box my={4} textAlign='left'>
            <Image
              borderRadius='full'
              boxSize='150px'
              src='https://bit.ly/sage-adebayo'
              alt='Segun Adebayo'
            />

            <input
              ref={inputRef}
              type='file'
              onChange={(e) => {
                setFile(e.target.files![0])
              }}
            />

            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='test@test.com'
                  size='lg'
                  onChange={(event) => setLogin(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  placeholder='*******'
                  size='lg'
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </FormControl>
              <Button
                type='submit'
                colorScheme='green'
                variant='outline'
                width='full'
                mt={4}
              >
                {isLoading ? (
                  <CircularProgress
                    size='30px'
                    isIndeterminate
                    color='green.300'
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </>
  )
}

export default SignUp
