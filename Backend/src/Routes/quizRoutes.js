const express = require('express')
const router = express.Router()

router.get('/:category', getCategoryquestions)

module.exports = router