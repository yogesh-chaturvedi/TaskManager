import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 py-5 text-center">
            <h2 className="text-lg font-semibold text-white">TaskManager</h2>
            <p className="text-sm mt-1">
                © {new Date().getFullYear()} TaskManager. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer
