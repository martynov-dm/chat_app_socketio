import * as express from 'express'
import { Router, Request, Response, NextFunction } from 'express'

const router: Router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect('/success')
  }
)

router.get('/failed', (req: Request, res: Response) => {
  res.status(401).send('Failed to log in!')
})

router.get('/success', (req: Request, res: Response) => {
  res.status(200).send('Success')
})
