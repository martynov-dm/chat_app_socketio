import React, { useState } from 'react'
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
} from '@chakra-ui/react'
import { userLogin } from '../api/api'
import ErrorMessage from '../components/common/ErrorMessage'
import { useDispatch } from 'react-redux'
import { authActions } from '../redux/auth/auth.actions'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    dispatch(authActions.signUpStart({ email, password }))

    setIsLoading(false)

    setEmail('')
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
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type='email'
                  placeholder='test@test.com'
                  size='lg'
                  onChange={(event) => setEmail(event.currentTarget.value)}
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
