const express = require('express')
const router = express.Router()

router.get('/:category', getCategoryquestions)
// router.post('/submitScore', submitAnswer)

module.exports = router