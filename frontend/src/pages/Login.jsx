import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { TaskContext } from '../context/TasksContext';

const Login = () => {


  const { user, setUser, loading, setLoading, verify } = useContext(AuthContext);
  const { getTasks } = useContext(TaskContext);


  const navigate = useNavigate();
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
      const { message, success, UserData } = resposne.data;
      if (success) {
        console.log(message);
        console.log('UserData', UserData)

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
        setUser(UserData)
        setTimeout(() => {
          if (UserData.role == "user") {
            navigate('/home');
          }
          else if (UserData.role == "admin") {
            navigate('/AdminDashboard')
          }
        }, 300);
        setLoginData({ name: '', email: '', password: '' })
      }
    }
    catch (error) {
      console.error('error', error);
      const message = error?.response?.data?.error?.details[0]?.message || error?.response?.data?.message;
      toast(message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6 text-gray-800">
          Login to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          {/* email */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={loginData.email}
              onChange={handleChange}
              name='email'
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* password */}
          <div>
            <label className="block text-sm sm:text-base font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              value={loginData.password}
              onChange={handleChange}
              name='password'
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 sm:py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-xs sm:text-sm">
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
