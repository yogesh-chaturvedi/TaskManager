const express = require('express')
const signupValidation = require('../middleware/AuthValidation')
const { signupController } = require('../controllers/authController')
const router = express.Router()


router.post('/signup', signupValidation, signupController)

module.exports = router
