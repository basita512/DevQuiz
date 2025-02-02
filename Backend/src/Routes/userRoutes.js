const express = require('express')
const { submitScore, startQuiz } = require('../Controllers/userController')

const router = express.Router()

router.post('/start', startQuiz)
router.post('/submit', submitScore)

module.exports = router