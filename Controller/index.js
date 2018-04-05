var express = require('express')
    , router = express.Router()
const auth          = require('./Auth')
const message          = require('./Message')
router.use('/user', auth)
router.use('/message', message)

module.exports = router