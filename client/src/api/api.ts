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
  return instance.post(
    'auth/register',
    { login, password, image },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
}
