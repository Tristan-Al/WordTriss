import React from 'react'
import { ArrowLeftStartOnRectangleIcon } from '@heroicons/react/24/outline'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useAlertToast from '../../hooks/useToast'

export default function AdminAuthorSidebarCard({ expanded }) {
  const { displayName, email, picture } = useAuth()

  const signOut = useSignOut()
  const navigate = useNavigate()
  const { toast } = useAlertToast()

  const handleSignOut = () => {
    // Sign out the user
    signOut()

    // Redirect to the home page
    navigate('/')

    // Show a toast message
    toast.showSuccess('You have been signed out')
  }

  return (
    <div className='border-t flex gap-1 p-3'>
      <img
        src={
          picture ??
          'https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true'
        }
        alt=''
        className='w-10 h-10 rounded-md'
      />
      <div
        className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? 'w-full ml-3 pr-1' : 'w-0'}
          `}
      >
        <div className='leading-4'>
          <h4 className='font-semibold'>{displayName}</h4>
          <span className='text-xs text-gray-600'>{email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className={'cursor-pointer hover:bg-gray-200 p-2 rounded-lg'}
        >
          <ArrowLeftStartOnRectangleIcon width={24} />
        </button>
      </div>
    </div>
  )
}
