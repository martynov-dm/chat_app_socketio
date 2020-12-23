interface UserData {
  email: string
  password: string
}

export const userLogin = async ({ email, password }: UserData) => {
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
