import React from 'react'
import { Route } from 'react-router-dom'
import DefaultLayout from '../layouts/DefaultLayout'
import Home from '../pages/Public/Home'
import Login from '../pages/Public/Login'
import Register from '../pages/Public/Register'
import Blog from '../pages/Public/Blog'
import SinglePost from '../pages/Public/Single'
import Archives from '../pages/Public/Archives'

export default function PublicRoutes() {
  return (
    <>
      <Route index element={<Home />} />

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
