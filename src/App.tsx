import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import { ToastContainer } from 'react-toastify'


function App() {

  return (
    <>
    <ToastContainer />
     <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
     </Routes>
    </>
  )
}

export default App
