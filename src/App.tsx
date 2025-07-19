import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'


function App() {

  return (
    <>
     <Routes>
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Login />} />
     </Routes>
    </>
  )
}

export default App
