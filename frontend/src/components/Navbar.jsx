import React from 'react'
import { LogOut } from 'lucide-react'
const Navbar = () => {
    return (
        <nav className="w-full px-28 bg-gray-800 shadow-md py-4 flex justify-between items-center">
            {/* Left: Logo / App Name */}

            <h1 className="text-2xl font-bold text-blue-600">TaskManager</h1>


            {/* Right: Logout Button */}
            <button

                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
            >
                <LogOut size={18} />
                Logout
            </button>
        </nav>
    )
}

export default Navbar
