import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import { ToastContainer } from 'react-toastify'
import ActivateAccount from './page/ActivateAccount'
import NotFoundPage from './page/NotFoundPage'
import RestardPassword from './page/RestardPassword'
import ResetPassword from './page/ResetPassword'
import MainPage from './page/MainPage'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Contact from './page/Contact'


function App() {
  /* 
    De todo el estado (state) que manejas en useAuthStore, solo me interesa la función initializeAuth.
  */
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth(); // Inicializa el estado de autenticación al montar la app
  }, [initializeAuth]); // Dependencia para asegurar que solo se ejecute una vez al montar

  return (
    <>
    <ToastContainer />
    <Navbar/>
     <Routes>
        <Route  path="/" element={<MainPage />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/contact" element={<Contact />} />
        <Route  path="/activate" element={<ActivateAccount />} />
        <Route  path="/reset" element={<RestardPassword />} />
        <Route  path="/resetpassword" element={<ResetPassword />} />



        <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </>
  )
}

export default App
