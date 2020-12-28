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
  CircularProgress,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import { authActions } from '../redux/auth/auth.actions'
import {
  selectSignInReqError,
  selectSignInReqStatus,
} from '../redux/auth/auth.selectors'
import ErrorPopUp from '../components/common/ErrorPopUp'

const SignIn = () => {
  const dispatch = useDispatch()
  const status = useSelector(selectSignInReqStatus)
  const errMessage = useSelector(selectSignInReqError)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    dispatch(authActions.signInStart({ login, password }))
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
            <form onSubmit={handleSubmit}>
              <FormControl mt={4} isRequired>
                <FormLabel>Login</FormLabel>
                <Input
                  value={login}
                  placeholder='Your login'
                  size='lg'
                  onChange={(event) => setLogin(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl mt={6} isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='*******'
                    size='lg'
                    onChange={(event) => setPassword(event.currentTarget.value)}
                  />
                  <InputRightElement width='3rem'>
                    <IconButton
                      mt={2}
                      aria-label='toggle passwod visibility'
                      size='md'
                      onClick={handlePasswordVisibility}
                      icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                type='submit'
                colorScheme='blue'
                variant='outline'
                width='full'
                mt={4}
              >
                {status === 'loading' ? (
                  <CircularProgress
                    size='30px'
                    isIndeterminate
                    color='blue.300'
                  />
                ) : (
                  'Sign In'
                )}
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>

      <ErrorPopUp
        errMessage={errMessage}
        clearAction={authActions.signInClear}
      />
    </>
  )
}

export default SignIn
