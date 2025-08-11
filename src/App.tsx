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
import AllPosts from './page/AllPosts'
import CatPostDetails from './page/CatPostDetails'
import EditProfile from './page/EditProfile'
import ProtectedRouteAdmin from './page/ProtectedRouteAdmin'
import NewBlogPost from './page/NewBlogPost'
import EditBlogPost from './page/EditBlogPost'
import BlogPosts from './components/BlogPosts'
import BlogPostPage from './page/BlogPostPage'
import MessagePage from './page/Message'


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
        <Route path="/catpost/:type" element={<AllPosts />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
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
        <Route
          path="/catpost/post/:id"
          element={
            <ProtectedRoute>
              <CatPostDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={<BlogPosts />
          }
        />
        <Route
          path="/blog/:id"
          element={<BlogPostPage />
          }
        />
        <Route
          path="/blog/new"
          element={
            <ProtectedRouteAdmin>
              <NewBlogPost />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/blog/edit"
          element={
            <ProtectedRouteAdmin>
              <EditBlogPost />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRouteAdmin>
              <MessagePage />
            </ProtectedRouteAdmin>
          }
        />



        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
