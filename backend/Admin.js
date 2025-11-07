const mongoose  =require('mongoose')
const User  = require('./models/User')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()


mongoose.connect(process.env.MONGO_URI)
    .then((res) => {
        console.log("create admin connected")
    }).catch((err) => {
        console.log("something went wrong")
    })

const createAdmin = async () => {
    try {
        const isAdminExist = await User.findOne({ email: "admin@gmail.com" });

        if (isAdminExist) {
            console.log("⚠️ Admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash('admin123', 10);

        const admin = new User({
            name: "Admin",
            email: "admin@example.com",
            password: hashedPassword, // you can change this
            role: "admin",
        });

        await admin.save();
        console.log("✅ Admin created successfully!");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error creating admin:", error);
        mongoose.connection.close();
    }
};

createAdmin();