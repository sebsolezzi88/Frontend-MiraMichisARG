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
import { useCallback, useEffect } from 'react'
import Navbar from './components/Navbar'
import Contact from './page/Contact'
import Profile from './page/Profile'
import ProtectedRoute from './page/ProtectedRoutes'
import NewCatPost from './page/NewCatPost'
import ReactModal from 'react-modal'
import CatPostToEdit from './page/CatPostToEdit'
import Footer from './components/Footer'


function App() {
  ReactModal.setAppElement('#root');
  return (
    <>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/activate" element={<ActivateAccount />} />
        <Route path="/reset" element={<RestardPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newcatpost"
          element={
            <ProtectedRoute>
              <NewCatPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editcatpost"
          element={
            <ProtectedRoute>
              <CatPostToEdit />
            </ProtectedRoute>
          }
        />



        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
