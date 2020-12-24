import Joi from '@hapi/joi'

interface registerData {
  login: string
  password: string
  avatar: Express.Multer.File
}

export const registerValidation = (data: registerData) => {
  const schema = Joi.object({
    login: Joi.string().min(2).required(),
    password: Joi.string().min(2).required(),
    avatar: Joi.required(),
  })

  return schema.validate(data)
}

// const loginValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().min(5).required().email(),
//     password: Joi.string().min(6).required(),
//   })

//   return schema.validate(data)
// }

// module.exports.registerValidation = registerValidation
// module.exports.loginValidation = loginValidation
