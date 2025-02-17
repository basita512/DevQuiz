const express = require('express')
const { getCategoryquestions, checkAnswer } = require('../Controllers/questionController')
const router = express.Router()

router.get('/:category/:userId/question/:questionId', getCategoryquestions)
router.post('/:category/:userId/checkAnswer', checkAnswer )

module.exports = router