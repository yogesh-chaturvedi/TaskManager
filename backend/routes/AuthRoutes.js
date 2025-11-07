const express = require('express')
const { signupValidation, loginValidation } = require('../middleware/AuthValidation')
const { signupController, loginController, logoutController } = require('../controllers/authController')
const router = express.Router()

// signup route 
router.post('/signup', signupValidation, signupController)

// login route
router.post('/login', loginValidation, loginController)

// logout route 
router.post('/logout', logoutController)



module.exports = router
