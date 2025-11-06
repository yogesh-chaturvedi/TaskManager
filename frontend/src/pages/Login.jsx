import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    console.log('loginData', loginData);


    // function to submit login details
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const resposne = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}auth/login`,
                data: loginData,
                withCredentials: true
            })
            const { message, success } = resposne.data;
            if (success) {
                console.log(message);
                toast(message, {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setLoginData({ name: '', email: '', password: '' })
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            value={loginData.email}
                            onChange={handleChange}
                            name='email'
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            value={loginData.password}
                            onChange={handleChange}
                            name='password'
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
                            Signup
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
