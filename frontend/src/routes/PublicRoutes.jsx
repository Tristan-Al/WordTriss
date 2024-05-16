import React from 'react'
import { Route } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import Home from '../pages/Home/Home'
import Login from '../pages/Authentication/Login'
import Register from '../pages/Authentication/Register'
import Blog from '../pages/Blog/Blog'
import SinglePost from '../pages/Posts/Single'
import Archives from '../pages/Archives/Archives'

export default function PublicRoutes() {
  return (
    <>
      <Route index element={<DefaultLayout children={<Home />} />} />

      <Route path='/login' element={<DefaultLayout children={<Login />} />} />
      <Route
        path='/register'
        element={<DefaultLayout children={<Register />} />}
      />
      <Route path='/blog' element={<DefaultLayout children={<Blog />} />} />
      <Route
        path='/post/:id'
        element={<DefaultLayout children={<SinglePost />} />}
      />
      <Route
        path='/:topic/:id'
        element={<DefaultLayout children={<Archives />} />}
      />
    </>
  )
}
