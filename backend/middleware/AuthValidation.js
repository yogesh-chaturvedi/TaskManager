const express = require("express")
const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const { name, email, password } = req.body

    try {
        const schema = Joi.object({
            Username: Joi.string().min(3).max(30).required(),
            Useremail: Joi.string().email().max(30).required(),
            Userpassword: Joi.string().min(5).max(12).required(),
        });

        // checking if there is any error in users credential of not 
        const { error } = schema.validate({
            Username: name,
            Useremail: email,
            Userpassword: password,
        })

        if (error) {
            return res.status(500).json({ message: "Validation Error", success: false, error })
        }

        next()
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({ message: "Something went wrong", success: false, error })
    }
}

module.exports = signupValidation