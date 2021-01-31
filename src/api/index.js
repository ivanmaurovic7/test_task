const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Origin')
  next()
})

require('./models/index')
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/taskZ", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})

const client = require('./routes/client')
const provider = require('./routes/provider')

app.use('/client', client)
app.use('/provider', provider)

app.use((error, req, res, next) => {
  console.log(error)
  res.status(error.statusCode || 500).json({ message: error.message})
})

const port = 3000
app.use('/', express.static(path.join(__dirname, '../../', 'dist')))

app.listen(port, () => {
  console.log(`Task-Z app running at http://localhost:${port}`)
})