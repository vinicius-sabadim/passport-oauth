const express = require('express')
const authRoutes = require('./routes/auth-routes')

const app = express()
const PORT = process.env.PORT || 3000

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home')
})

app.use('/auth', authRoutes)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
)
