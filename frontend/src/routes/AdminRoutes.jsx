import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import AdminLayout from '../layouts/AdminLayout'
import Dashboard from '../pages/Admin/Dashboard/Dashboard'
import PostsDashboard from '../pages/Admin/Posts/PostsDashboard'
import EditPost from '../pages/Admin/Posts/EditPost'
import Profile from '../pages/Admin/Profile/Profile'
import CreatePost from '../pages/Admin/Posts/CreatePost'

export default function AdminRoutes() {
  return (
    <>
      <Route
        path='/wt-content/dashboard'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <AdminLayout children={<Dashboard />} />
          </RequireAuth>
        }
      />
      <Route
        path='/wt-content/profile'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <AdminLayout children={<Profile />} />
          </RequireAuth>
        }
      />

      {/* Posts */}
      <Route
        path='/wt-content/posts'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <AdminLayout children={<PostsDashboard />} />
          </RequireAuth>
        }
      />

      <Route
        path='/wt-content/posts/edit/:id'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <EditPost />
          </RequireAuth>
        }
      />

      <Route
        path='/wt-content/posts/create'
        element={
          <RequireAuth fallbackPath={'/login'}>
            <CreatePost />
          </RequireAuth>
        }
      />

      <Route
        path='/wt-content'
        element={<Navigate to='/wt-content/dashboard' replace />}
      />
      <Route
        path='/wt-content/*'
        element={<Navigate to='/wt-content/dashboard' replace />}
      />
    </>
  )
}
