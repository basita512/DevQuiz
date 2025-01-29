const express = require('express')
const cors = require('cors')
const connectDB = require('./config/config')

const app = express()

app.use(cors())
app.use(express.json())
connectDB()

module.exports = app