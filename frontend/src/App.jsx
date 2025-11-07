import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import AdminDashboard from './pages/AdminDashboard'
import AdminProtectedRoute from './components/AdminProtectedRoute'

function App() {

  return (
    <Routes>

      {/* global routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
      </Route>


      {/* protected Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path='/AdminDashboard' element={<AdminDashboard />} />
      </Route>

    </Routes>

  )
}

export default App
