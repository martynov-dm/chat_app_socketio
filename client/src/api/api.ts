import { LoginPasswordImage } from './../types/types'
import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'api/',
})

export const signUpRequest = ([
  login,
  password,
  image,
]: Array<LoginPasswordImage>) => {
  //@ts-ignore
  const imageAsFile = new File([image as Blob], login)

  return instance.post(
    'auth/register',
    { login, password, image: imageAsFile },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}
