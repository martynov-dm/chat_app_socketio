import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'api/',
})

export const signUpRequest = (userData: string[]) => {
  const [login, password, image] = userData
  return instance.post('auth/register', { login, password, image })
}
