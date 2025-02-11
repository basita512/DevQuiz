const express = require('express')
const cors = require('cors')
const connectDB = require('./config/config')
const userRoutes = require('./Routes/userRoutes')
const quizRoutes = require('./Routes/quizRoutes')
const LeaderboardRoutes = require('./Routes/LeaderboardRoute')

const app = express()

app.use(cors())
app.use(express.json())
connectDB()

app.use('/api/user', userRoutes)
app.use('/api/quiz', quizRoutes)
app.use('/api/result', LeaderboardRoutes)

module.exports = app