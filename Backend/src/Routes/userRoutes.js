const express = require('express')

const router = express.Router()

router.post('/start', startQuiz)

module.exports = router