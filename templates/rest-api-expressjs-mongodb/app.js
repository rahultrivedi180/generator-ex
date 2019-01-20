const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose
  .connect(
    'DB_URL',
    { useNewUrlParser: true }
  )
  .then(() => console.log('db connected'))
  .catch(err => console.log(err.stack))

const userRoutes = require('./api/routes/userRoutes')

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', userRoutes)

app.use((req, res, next) => {
  const error = new Error('Route Not Found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
