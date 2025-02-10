const express = require('express')
const { getCategoryquestions, submitAnswer } = require('../Controllers/questionController')
const router = express.Router()

router.get('/:category/:userId', getCategoryquestions)
router.post('/submitScore', submitAnswer )

module.exports = router