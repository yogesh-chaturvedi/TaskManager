const UserModel = require('../models/User')
const bcrypt = require('bcrypt')

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

// update user data
const UpdateUser = async (req, res) => {
    try {
        const { newName, newEmail, newPassword } = req.body;
        const { UserId } = req.params;

        // Basic validation
        if (!newName || !newEmail) {
            return res.status(400).json({ message: "Name and email are required", success: false });
        }

        const user = await UserModel.findById(UserId);
        if (!user) {
            return res.status(401).json({ message: 'User not found', success: false })
        }

        user.name = newName
        user.email = newEmail


        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword

        await user.save();

        res.status(200).json({ message: 'Users Updated Successfully', success: true })
    }
    catch (error) {
        console.error('fetchUser error', error)
        res.status(500).json({ message: 'Something went wrong', success: false, error })
    }
}



module.exports = { fetchAllUsers, UpdateUser }