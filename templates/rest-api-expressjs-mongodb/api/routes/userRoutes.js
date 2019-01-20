const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/addUser', userController.addUser)
router.get('/allUsers', userController.showUsers)

module.exports = router
