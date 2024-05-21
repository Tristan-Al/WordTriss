import React, { useEffect, useState } from 'react'
import userService from '../../services/userService'
import { Link } from 'react-router-dom'

export default function BlogAuthorCard({ authorId }) {
  const [author, setAuthor] = useState({})

  useEffect(() => {
    async function getAuthor() {
      try {
        const author = await userService.getUserById(authorId)
        setAuthor(author)
      } catch (error) {
        console.error(error)
      }
    }

    getAuthor()
  }, [authorId])

  return (
    <Link
      to={`/authors/${authorId}`}
      className='flex items-center hover:bg-gray-200 rounded p-2 overflow-hidden'
    >
      <img
        className='object-cover object-center w-10 h-10 rounded-full'
        src={
          author.picture ??
          'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
        }
        alt='Author Picture'
      />
      <div className='mx-4'>
        <h1 className='text-sm text-gray-700 dark:text-gray-200'>
          {author.displayName}
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-400 overflow-ellipsis'>
          {author.email}
        </p>
      </div>
    </Link>
  )
}
