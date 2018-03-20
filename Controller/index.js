var express = require('express')
    , router = express.Router()
const auth          = require('./Auth')
router.use('/user', auth)

module.exports = router