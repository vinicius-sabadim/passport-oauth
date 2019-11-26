const router = require('express').Router()

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  // TODO: handle with passport
  res.send('do the logout')
})

router.get('/google', (req, res) => {
  // TODO: handle with passport
  res.send('logging in with google')
})

module.exports = router
