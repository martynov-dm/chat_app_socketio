import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

// var GoogleStrategy = require('passport-google-oauth20').Strategy

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '564657726979-9bvrbufpm8g51j9jnrqbeu9k8vd2b7q1.apps.googleusercontent.com',
      clientSecret: 'Wq6Q8t-Cy_mgjSHqCN1DAjm5',
      callbackURL: 'http://localhost:5000/api/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return cb(err, user)
      })
    }
  )
)
