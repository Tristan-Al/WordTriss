import React, { useEffect, useState } from 'react'
import userService from '../../services/userService'
import { Link } from 'react-router-dom'

export default function SingleAuthorCard({ authorId, date }) {
  const [user, setUser] = useState({})

  useEffect(() => {
    async function getUser() {
      try {
        const user = await userService.getUserById(authorId)
        setUser(user)
      } catch (error) {
        console.error(error)
      }
    }

    getUser()
  }, [authorId])

  return (
    <div className='flex mt-3'>
      <img
        src={
          user.picture ??
          'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
        }
        className='h-10 w-10 rounded-full mr-2 object-cover'
        alt='User'
      />
      <div>
        <Link
          className='font-semibold text-gray-200 text-sm transition hover:text-gray-50'
          to={`/authors/${authorId}`}
        >
          {user.displayName}
        </Link>
        <p className='font-semibold text-gray-400 text-xs'>{date}</p>
      </div>
    </div>
  )
}
