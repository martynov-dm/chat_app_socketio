import jwt, { Secret } from 'jsonwebtoken'
import { Request, Response } from 'express'

import { registerValidation } from './../validation/validation'
import { uploadPicture } from './../services/cloudinary'
import User from '../models/user/user.model'
import options from '../config'

export const registerController = async (req: Request, res: Response) => {
  const image = (req.files as Express.Multer.File[])[0]
  try {
    const { error } = registerValidation({
      login: req.body.login,
      password: req.body.password,
      avatar: (req.files as Express.Multer.File[])[0],
    })
    if (error) return res.status(400).send(error.details[0].message)

    const loginExist = await User.findOne({ login: req.body.login })
    if (loginExist) return res.status(400).send('Login already exists')

    const result = await uploadPicture(image.buffer, req.body.name)
    const newUser = new User({
      login: req.body.login,
      password: req.body.password,
      //@ts-ignore
      avatar: result.eager[0].secure_url,
    })
    await newUser.save()
    res.status(200).json({
      status: 'ok',
      message: 'Registered',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'error',
      message: 'Could not register',
    })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { _id: user._id }
    const token = jwt.sign(payload, options.jwtSecret as Secret, {
      expiresIn: '48h',
    })
    res.status(200).json({ status: 'ok', token })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
    })
  }
}
