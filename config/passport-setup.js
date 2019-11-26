const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')

const User = require('../models/user-model')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id })
        .then(currentUser => {
          if (currentUser) {
            console.log('The current user is: ', currentUser)
            done(null, currentUser)
          } else {
            const user = new User({
              username: profile.displayName,
              googleId: profile.id
            })
            user.save().then(newUser => {
              console.log('New user created: ', newUser)
              done(null, newUser)
            })
          }
        })
        .catch(err => {})
    }
  )
)
