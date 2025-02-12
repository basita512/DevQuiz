const express = require('express')
const getLeaderboard = require('../Controllers/leaderBoardController')

const router = express.Router()

router.get('/leaderboard', getLeaderboard)

module.exports = router