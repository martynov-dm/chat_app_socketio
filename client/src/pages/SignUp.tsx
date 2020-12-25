/** @jsx jsx */
import { css, jsx } from '@emotion/react'
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
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { authActions } from '../redux/auth/auth.actions'
import avatarPlaceholder from '../images/avatar_placeholder.png'

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
    <React.Fragment>
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
            <Flex align='center' justifyContent='center' mb={3}>
              <Image
                borderRadius='full'
                boxSize='130px'
                src={avatarPlaceholder}
                alt='Segun Adebayo'
              />
            </Flex>

            <form onSubmit={handleSubmit}>
              <div css={{ background: 'red' }}>dick</div>

              <input
                css={css`
                  display: none;
                `}
                required
                ref={inputRef}
                type='file'
                onChange={(e) => {
                  setFile(e.target.files![0])
                }}
              />
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
    </React.Fragment>
  )
}

export default SignUp
