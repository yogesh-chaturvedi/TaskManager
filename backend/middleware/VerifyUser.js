const jwt = require('jsonwebtoken');
const UserModel = require('../models/User')

// to verify User
const verifyUser = async (req, res, next) => {
    try {

        const token = req.cookies?.Token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // console.log('decoded', decoded)

        // fetching the user
        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "No User Found",
            });
        }

        // Attach user data to request
        req.user = user;

        next();
    } catch (err) {
        console.error("Auth Middleware Error:", err.message);

        res.status(403).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = verifyUser;