import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import { ToastContainer } from 'react-toastify'
import ActivateAccount from './page/ActivateAccount'
import NotFoundPage from './page/NotFoundPage'


function App() {

  return (
    <>
    <ToastContainer />
     <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/activate/:token" element={<ActivateAccount />} />

        
        <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </>
  )
}

export default App
