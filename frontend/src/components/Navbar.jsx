import React, { useContext, useState } from 'react'
import { LogOut, Settings, User } from 'lucide-react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false)

    const { user, setUser, loading, setLoading, fetchUser } = useContext(AuthContext)

    // logout function
    async function handleLogout() {
        try {
            const response = await axios({
                method: 'post',
                url: `${import.meta.env.VITE_BASE_URL}auth/logout`,
                withCredentials: true
            })
            const { message, success } = response.data;
            if (success) {
                setUser(null)
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
                navigate('/login')
            }
        }
        catch (error) {
            console.error('Logout Error', error);
        }
    }

    function handleOpen() {
        if (open == true) {
            setOpen(false);
        }
        else {
            setOpen(true);
        }
    }

    function handleProfile() {
        navigate('/profile')
    }

    return (
        <main>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <nav className="w-full px-28 bg-gray-800 shadow-md py-4 flex justify-between items-center">

                {/* Left: Logo / App Name */}

                <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>

                {/* Right: Logout Button */}

                <div className="relative">
                    {/* 🔹 Profile Icon */}
                    <div
                        onClick={() => handleOpen()}
                        className="cursor-pointer border-2 border-white rounded-full p-1 hover:scale-105 transition-transform duration-200"
                    >
                        <User color="white" size={30} />
                    </div>

                    {/* 🔹 Dropdown Menu */}
                    {open && (
                        <div
                            className="absolute right-0 mt-3 w-56 bg-gray-900 text-gray-200 rounded-xl shadow-lg border border-gray-700 p-4 z-50 animate-fadeIn"
                        >
                            {/* User Info */}
                            <div className="flex items-center gap-3 mb-3 border-b border-gray-700 pb-3">
                                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center text-lg font-semibold">
                                    U
                                </div>
                                <div>
                                    <p className="font-semibold text-white text-sm">{user.name}</p>
                                    <p className="text-xs text-gray-400">{user.email}</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-2">
                                <button onClick={() => { handleProfile() }} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-200 text-sm">
                                    <User size={16} /> Profile
                                </button>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200 text-sm mt-1"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>




            </nav>
        </main>
    )
}

export default Navbar
