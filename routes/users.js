const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users')

//list router
router.get('/testing-user', controllers.testingUser)


module.exports = router;
