import { Route, Routes } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import { ToastContainer } from 'react-toastify'
import ActivateAccount from './page/ActivateAccount'
import NotFoundPage from './page/NotFoundPage'
import RestardPassword from './page/RestardPassword'
import ResetPassword from './page/ResetPassword'
import MainPage from './page/MainPage'


function App() {

  return (
    <>
    <ToastContainer />
     <Routes>
        <Route  path="/" element={<MainPage />} />
        <Route  path="/login" element={<Login />} />
        <Route  path="/register" element={<Register />} />
        <Route  path="/activate" element={<ActivateAccount />} />
        <Route  path="/reset" element={<RestardPassword />} />
        <Route  path="/resetpassword" element={<ResetPassword />} />



        <Route path="*" element={<NotFoundPage />} />
     </Routes>
    </>
  )
}

export default App
