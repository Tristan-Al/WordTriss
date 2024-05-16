import React from 'react'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import CardProfile from '../../../components/Cards/CardProfile'
import CardSettings from '../../../components/Cards/CardSettings'

const Profile = () => {
  const { toast } = useAlertToast()
  const { userId, displayName, username, email, roleId, isAdmin, picture } =
    useAuth()

  return (
    <>
      <AdminHeader
        path={'profile'}
        userDisplayName={displayName}
        userPic={picture}
      />
      <div className='flex flex-wrap'>
        <div className='w-full lg:w-8/12 px-4'>
          <CardSettings />
        </div>
        <div className='w-full lg:w-4/12 px-4'>
          <CardProfile />
        </div>
      </div>
    </>
  )
}

export default Profile
