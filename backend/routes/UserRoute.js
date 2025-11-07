const express = require('express')
const verifyUser = require('../middleware/VerifyUser')
const router = express.Router()


// to get user data
router.get('/fetch', verifyUser, (req, res) => {
    res.status(200).json({ message: 'User is Authorized', success: true, userData: req.user })
})

module.exports = router
