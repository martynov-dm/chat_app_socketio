import { ILoginPasswordAvatar } from './../types/types'
import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'api/',
})

export const signUpRequest = ([
  login,
  password,
  image,
]: Array<ILoginPasswordAvatar>) => {
  const data = new FormData()
  //@ts-ignore
  data.append('login', login as string)
  //@ts-ignore
  data.append('password', password as string)
  //@ts-ignore

  data.append('image', image as Blob, 'Avatar')

  return instance.post('auth/register', data, {
    headers: {
      //@ts-ignore
      'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    },
  })
}

export const signInRequest = ([login, password]: Array<string>) => {
  return instance.post('auth/login', {
    login,
    password,
  })
}
