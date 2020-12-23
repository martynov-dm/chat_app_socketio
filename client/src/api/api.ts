import { EmailAndPassword } from '../types/types'

export const userLogin = async ({ email, password }: EmailAndPassword) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@test.com' && password === 'password') {
        resolve('success')
      } else {
        reject()
      }
    }, 3000)
  })
}
