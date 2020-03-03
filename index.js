const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const apiRouter = require('./routes/routes')

const app = express()

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/toDoList", {
  useCreateIndex: true,
  useNewUrlParser: true,
})

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use('/api', apiRouter)
app.listen(3000)
