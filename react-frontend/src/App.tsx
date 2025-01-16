import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import { Button } from './components/ui/button'
import { Routes, Route } from "react-router-dom";
import SignupForm from './_auth/forms/SignupForm'
import SigninForm from './_auth/forms/SigninForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Home } from './_root/pages'
import Post from './_root/pages/Post'
import PostEdit from './_root/pages/PostEdit'
import PostCreate from './_root/pages/PostCreate'
import HomeLikeSorted from './_root/pages/HomeLikeSorted'
import UsersPage from './_root/pages/UsersPage'


const App = () => {
  return(
    <main className="flex h-screen">
    <Routes>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SigninForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>

      {/* private routes */}
      <Route element={<RootLayout />}>
        <Route index path="/" element={<Home/>} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/posts/edit/:id" element={<PostEdit />} />
        <Route path="/posts/create" element={<PostCreate />} />
        <Route path="/posts/sortByLikes" element={<HomeLikeSorted />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  </main>
  )
}
  

export default App
