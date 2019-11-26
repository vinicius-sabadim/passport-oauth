require('dotenv').config()
require('./config/passport-setup')

const express = require('express')
const authRoutes = require('./routes/auth-routes')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [process.env.COOKIE_KEY]
  })
)
app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB')
  }
)

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/auth', authRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
