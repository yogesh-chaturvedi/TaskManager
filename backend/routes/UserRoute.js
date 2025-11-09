const express = require('express')
const verifyUser = require('../middleware/VerifyUser')
const { fetchAllUsers } = require('../controllers/UsersControllers')
const router = express.Router()


// to verify user
router.get('/verify', verifyUser, (req, res) => {
    res.status(200).json({ message: 'User is Authorized', success: true, userData: req.user })
})

// get all user
router.get('/fetch', verifyUser, fetchAllUsers)



module.exports = router
