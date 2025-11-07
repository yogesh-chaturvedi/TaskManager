import React from 'react'
import { LogOut } from 'lucide-react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Navbar = () => {

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
            }
        }
        catch (error) {
            console.error('Logout Error', error);
        }
    }


    return (
        <main>
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />

            <nav className="w-full px-28 bg-gray-800 shadow-md py-4 flex justify-between items-center">

                {/* Left: Logo / App Name */}

                <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>

                {/* Right: Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </nav>
        </main>
    )
}

export default Navbar
