import axios from 'axios'

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'api/',
})

interface FormDataWithBoundary extends FormData {
  _boundary: string
}

export const signUpRequest = ([login, password, image]: [
  string,
  string,
  Blob
]) => {
  const data = new FormData() as FormDataWithBoundary

  data.append('login', login as string)

  data.append('password', password as string)

  data.append('image', image, 'Avatar')

  return instance.post('auth/register', data, {
    headers: {
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
