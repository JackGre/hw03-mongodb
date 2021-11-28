// XX3ttmR8QUEHmD1z
// mongodb+srv://JackGre:XX3ttmR8QUEHmD1z@cluster0.pptaw.mongodb.net/db-contacts?retryWrites=true&w=majority
// mongodb+srv://JackGre:XX3ttmR8QUEHmD1z@cluster0.pptaw.mongodb.net/test
const mongoose = require('mongoose')
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: err.message })
})

const DB_HOST = 'mongodb+srv://JackGre:XX3ttmR8QUEHmD1z@cluster0.pptaw.mongodb.net/db-contacts?retryWrites=true&w=majority'
mongoose.connect(DB_HOST)
  .then(() => console.log('Database connection successful'))
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
module.exports = app
