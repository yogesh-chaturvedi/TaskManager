const express = require('express')
const { signupValidation, loginValidation } = require('../middleware/AuthValidation')
const { signupController, loginController } = require('../controllers/authController')
const router = express.Router()


router.post('/signup', signupValidation, signupController)
router.post('/login', loginValidation, loginController)

module.exports = router
