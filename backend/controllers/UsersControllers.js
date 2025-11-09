const UserModel = require('../models/User')


// to get all users 
const fetchAllUsers = async (req, res) => {
    try {

        const users = await UserModel.find({ role: { $ne: 'admin' } });
        res.status(200).json({ message: 'Users fetched Successfully', success: true, users })
    }
    catch (error) {
        console.error('fetchUser error', error)
        res.status(500).json({ message: 'Something went wrong', success: false, error })
    }
}

module.exports = { fetchAllUsers }