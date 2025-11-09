import React, { useContext, useState } from 'react'
import { User, Mail, Shield, Edit3, LogOut, X } from "lucide-react";
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Profile = () => {

    const { user, setUser } = useContext(AuthContext)
    const [EditMode, setEditMode] = useState(false)

    const [NewData, setNewData] = useState({
        newName: '',
        newEmail: '',
        newPassword: ''
    })

    // to edit profile data 
    async function handleEditProfile(userId) {

        if (NewData.newName === '' || NewData.newEmail === '' || NewData.newPassword === '') {
            toast("Please fill all fields", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        try {
            const resposne = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}users/editProfile/${userId}`,
                data: NewData,
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
                setEditMode(false)
                setNewData({ newName: '', newEmail: '', newPassword: '' })
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }

    function handleCloseEdit() {
        setEditMode(false)
    }

    function handleEditMode() {
        setEditMode(true)
    }

    function handleChange(e) {
        setNewData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    return (
        <div className="min-h-screen bg-gray-950 text-gray-200 flex items-center justify-center p-6 relative">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
            <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-lg overflow-hidden p-8 border border-gray-800">

                {/* Profile Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-28 h-28 rounded-full border-4 border-gray-700 object-cover"
                    />
                    <h2 className="mt-4 text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-sm text-gray-400">{user.role}</p>
                </div>

                {/* Divider */}
                <div className="my-6 border-t border-gray-700"></div>

                {/* Details Section */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <User size={20} className="text-yellow-500" />
                        <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-gray-100">Name:</span>{" "}
                            {user.name}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Mail size={20} className="text-yellow-500" />
                        <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-gray-100">Email:</span>{" "}
                            {user.email}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Shield size={20} className="text-yellow-500" />
                        <p className="text-gray-300 text-sm">
                            <span className="font-semibold text-gray-100">Role:</span>{" "}
                            {user.role}
                        </p>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-8 flex flex-col gap-3">
                    <button onClick={() => { handleEditMode() }} className="flex items-center justify-center gap-2 w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all">
                        <Edit3 size={16} /> Edit Profile
                    </button>

                    <button className="flex items-center justify-center gap-2 w-full py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition-all">
                        <LogOut size={16} /> Logout
                    </button>
                </div>
            </div>

            {EditMode && (<div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                <div className="bg-gray-900 text-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">

                    {/* Close Button */}
                    <button onClick={() => handleCloseEdit()} className="absolute top-3 right-3 text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>

                    <h2 className="text-2xl font-semibold text-center mb-6">Update Profile</h2>

                    {/* Name Field */}
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Updated Name</label>
                        <input
                            value={NewData.newName}
                            onChange={handleChange}
                            name='newName'
                            type="text"
                            placeholder="Enter new name"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Updated Email</label>
                        <input
                            value={NewData.newEmail}
                            onChange={handleChange}
                            name='newEmail'
                            type="email"
                            placeholder="Enter new email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* password Field */}
                    <div className="mb-4">
                        <label className="block text-sm mb-1">Updated Password</label>
                        <input
                            value={NewData.newPassword}
                            onChange={handleChange}
                            name='newPassword'
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Error Message */}
                    <p className="text-red-400 text-sm mb-4">Both fields are required.</p>

                    {/* Submit Button */}
                    <button onClick={() => { handleEditProfile(user._id) }} className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-semibold py-2 rounded-lg">
                        Update
                    </button>
                </div>
            </div>
            )}
        </div>
    )
}

export default Profile
