import React, { useContext, useEffect, useState } from 'react'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import AdminHeader from '../../../components/Headers/AdminHeader'

const Dashboard = () => {
  const { toast } = useAlertToast()
  const { userId, displayName, username, email, roleId, isAdmin, picture } =
    useAuth()

  return (
    <>
      <AdminHeader
        path={'dashboard'}
        userDisplayName={displayName}
        userPic={picture}
      />
    </>
  )
}

export default Dashboard
