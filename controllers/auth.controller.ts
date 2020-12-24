import { registerValidation } from './../validation/validation'
import { uploadPicture } from './../services/cloudinary'
import express from 'express'
import cloudinary from '../services/cloudinary'
import User from '../models/user.model'
import { UploadApiResponse } from 'cloudinary'
import multer from 'multer'

export const registerController = async (req: any, res: any) => {
  const image = req.files[0] as Express.Multer.File
  try {
    const { error } = registerValidation({
      login: req.body.login,
      password: req.body.password,
      avatar: req.files[0],
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
