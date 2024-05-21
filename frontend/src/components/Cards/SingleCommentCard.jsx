import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import userService from '../../services/userService'
import Loading from '../Loading/Loading'
import commentService from '../../services/commentService'

export default function SingleCommentCard({ commentId }) {
  const [user, setUser] = useState(null)
  const [comment, setComment] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const commentData = await commentService.getCommentById(commentId)
      const userData = await userService.getUserById(commentData.userId)
      setComment(commentData)
      setUser(userData)
    }

    fetchData().then(() => setLoading(false))
  }, [commentId])

  console.log('Comment: ', comment)
  console.log('User: ', user)

  if (loading) {
    return <Loading />
  }

  return (
    <div
      key={commentId}
      className='flex items-center w-full p-5  mt-5 bg-white border border-gray-200 rounded-lg sm:shadow'
    >
      <img
        src={
          // user.picture ??
          'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
        }
        alt='avatar'
        className='hidden object-cover w-14 h-14 m-2 rounded-full sm:block'
      />
      <div>
        <h3 className='text-lg font-bold text-purple-500'>
          By {user.displayName}
        </h3>
        <p className='text-sm font-bold text-gray-300'>
          {/* {format(new Date(comment.date), 'MMMM dd, yyyy')} */}
        </p>
        <p className='mt-2 text-base text-gray-500 sm:text-lg md:text-normal'>
          {comment.content}
        </p>
      </div>
    </div>
  )
}
