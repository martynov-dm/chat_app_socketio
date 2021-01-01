import options from '../config'
import passportJWT from 'passport-jwt'
import User from '../models/user/user.model'
import { Request } from 'express'

const cookieExtractor = (req: Request) => {
  return req && req.cookies && req.cookies.token
}

const jwtOptions = {
  secretOrKey: options.jwtSecret,
  jwtFromRequest: passportJWT.ExtractJwt.fromExtractors([cookieExtractor]),
}

const jwtStrategy = new passportJWT.Strategy(jwtOptions, (jwtPayload, done) => {
  User.findById(jwtPayload.uid, (err, user) => {
    if (err) {
      return done(err, null)
    }
    if (user) {
      return done(err, user)
    }
    return done(null, false)
  })
})

export default jwtStrategy
