const express = require('express')
const router = express.Router()
const controllers = require('../controllers/ToDo')
const middleware = require('../middleware/authentication')

router.get('/unfinished', middleware.verifyToken, controllers.getAllUnFinish)


module.exports = router