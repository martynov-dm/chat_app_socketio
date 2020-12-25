import { css } from '@emotion/react'
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
  Text,
  IconButton,
  CircularProgress,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import ErrorMessage from '../components/common/ErrorMessage'

import { authActions } from '../redux/auth/auth.actions'
import avatarPlaceholder from '../images/avatar_placeholder.png'

const SignUp = () => {
  const [error, setError] = useState('')

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
            <Heading>Register</Heading>
          </Box>
          <Box my={4} textAlign='left'>
            <form onSubmit={handleSubmit}>
              <Flex
                mx='auto'
                boxSize='130px'
                align='center'
                justifyContent='center'
                css={css`
                  position: relative;
                  text-align: center;
                  cursor: pointer;
                  transition: all 0.4s;
                  &:hover {
                    opacity: 0.7;
                  }
                `}
                mb={3}
              >
                <label htmlFor='file'>
                  <Image
                    boxShadow='md'
                    borderRadius='full'
                    boxSize='130px'
                    src={avatarPlaceholder}
                    alt='Segun Adebayo'
                    css={css`
                      cursor: pointer;
                    `}
                  />
                  <Text
                    fontSize='xl'
                    css={css`
                      font-weight: 700;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                      color: #1a202c;
                      cursor: pointer;
                    `}
                  >
                    Add Image
                  </Text>
                </label>
                <input
                  name='file'
                  id='file'
                  className='inputfile'
                  css={css`
                    position: absolute;
                    opacity: 0;

                    z-index: -5;
                  `}
                  required
                  ref={inputRef}
                  type='file'
                  onChange={(e) => {
                    setFile(e.target.files![0])
                  }}
                />
              </Flex>

              <FormControl mt={4} isRequired>
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
                colorScheme='blue'
                variant='outline'
                width='full'
                mt={4}
              >
                {isLoading ? (
                  <CircularProgress
                    size='30px'
                    isIndeterminate
                    color='blue.300'
                  />
                ) : (
                  'Sign Up'
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
