const express = require('express')
const router = express.Router()
const controllers = require('../controllers/optimize')
const middleware = require('../middleware/authentication')



module.exports = router