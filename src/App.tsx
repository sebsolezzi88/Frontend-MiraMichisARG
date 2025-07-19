import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'


function App() {

  return (
    <>
     <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
     </Routes>
    </>
  )
}

export default App
