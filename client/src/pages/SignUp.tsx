import { css } from '@emotion/react'
import React, { useRef, useState } from 'react'
import ThemeToggler from '../components/common/ThemeToggler'
import { Link as ReactRouterLink } from 'react-router-dom'

import {
  Flex,
  Link,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Image,
  Text,
  CircularProgress,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'

import avatarPlaceholder from '../images/avatar_placeholder.png'

import ImageCropper from '../components/ImageCropper/ImageCropper'
import { authActions } from '../redux/auth/auth.actions'
import {
  selectSignUpReqError,
  selectSignUpReqStatus,
} from '../redux/auth/auth.selectors'
import ErrorPopUp from '../components/common/ErrorPopUp'

const SignUp = () => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const status = useSelector(selectSignUpReqStatus)
  const errMessage = useSelector(selectSignUpReqError)

  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const [inputImg, setInputImg] = useState('' as ArrayBuffer | string)
  const [blob, setBlob] = useState(null as Blob | null)
  const [finalImage, setFinalImage] = useState('')
  const [isCropping, setIsCropping] = useState(false)

  const [showPassword, setShowPassword] = useState(false)

  const handlePasswordVisibility = () => setShowPassword(!showPassword)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const avatar = blob as Blob
    dispatch(authActions.signUpStart({ login, password, avatar }))
  }
  const getBlob = (blob: Blob) => {
    // pass blob up from the ImageCropper component
    setBlob(blob)
  }
  const onFileInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    // convert image file to base64 string
    const file = (e.target as HTMLInputElement).files![0]
    const reader = new FileReader()
    if (file) {
      reader.readAsDataURL(file)
    }
    reader.addEventListener(
      'load',
      () => {
        setInputImg(reader.result as ArrayBuffer | string)
        setIsCropping(true)
      },
      false
    )
  }

  // if (status === 'succeeded') {
  //   setLogin('')
  //   setPassword('')
  //   setInputImg('')
  //   setBlob(null)
  //   setFinalImage('')
  //   setShowPassword(false)
  // }
  return (
    <>
      <ThemeToggler />

      {isCropping ? (
        <ImageCropper
          setIsCropping={setIsCropping}
          getBlob={getBlob}
          setFinalImage={setFinalImage}
          inputImg={inputImg}
        />
      ) : (
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
                  {blob ? (
                    <>
                      <label htmlFor='file'>
                        <Image
                          boxShadow='md'
                          css={css`
                            cursor: pointer;
                          `}
                          boxSize='130px'
                          src={finalImage as string}
                          borderRadius='full'
                        />
                      </label>
                      <input
                        name='file'
                        accept='image/*'
                        id='file'
                        className='inputfile'
                        css={css`
                          position: absolute;
                          opacity: 0;

                          z-index: -5;
                        `}
                        ref={inputRef}
                        type='file'
                        onChange={onFileInputChange}
                      />
                    </>
                  ) : (
                    <>
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
                        accept='image/*'
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
                        onChange={onFileInputChange}
                      />
                    </>
                  )}
                </Flex>

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
                      onChange={(event) =>
                        setPassword(event.currentTarget.value)
                      }
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
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Box>
            <Flex>
              <Link mx='auto' as={ReactRouterLink} to='/sign-in'>
                Already have an account? Sign in
              </Link>
            </Flex>
          </Box>
        </Flex>
      )}

      <ErrorPopUp
        errMessage={errMessage}
        clearAction={authActions.signUpClear}
      />
    </>
  )
}

export default SignUp
