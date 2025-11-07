import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <Routes>

      {/* global routes */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />

      {/* protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
      </Route>

    </Routes>

  )
}

export default App
