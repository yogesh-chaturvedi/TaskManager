import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoute = () => {

    const { user, loading } = useContext(AuthContext)

    if (loading === true) {
        return (
            <div className=' flex min-h-screen items-center justify-center'>
                <p className='text-3xl font-bold text-gray-900 '>Loading...</p>
            </div>
        )
    }
    return user ? <Outlet /> : <Navigate to='/login' replace />

}

export default ProtectedRoute
