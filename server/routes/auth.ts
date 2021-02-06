import {
  loginController,
  registerController,
} from '../controllers/auth.controller'
import * as express from 'express'
import { Router } from 'express'
import uploader from '../services/multer'

const router: Router = express.Router()

router.post('/register', uploader.any(), registerController)

router.post('/login', loginController)

export default router
