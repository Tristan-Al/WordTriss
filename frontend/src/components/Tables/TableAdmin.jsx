import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { usePostThumbnailPreview } from '../../hooks/useImagePreview'
import { Chip, IconButton, Tooltip, Typography } from '@material-tailwind/react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import AuthorCard from '../Cards/AuthorCard'
import useAuth from '../../hooks/useAuth'

const PostTumbnail = ({ thumbnail }) => {
  const thumbnailPreview = usePostThumbnailPreview(thumbnail)

  return (
    <img
      className='h-14 w-14 rounded-lg object-cover object-center mx-auto'
      src={thumbnailPreview}
      alt='Post image'
    />
  )
}

export default function TableAdmin({ posts }) {
  const { roleName } = useAuth()
  console.log('roleName', roleName)
  return posts.map(
    ({ id, thumbnail, title, userId, createdAt, status }, index) => {
      const isLast = index === posts.length - 1
      const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

      return (
        <tr key={title}>
          <td className={classes}>
            <PostTumbnail thumbnail={thumbnail} />
          </td>
          <td className={classes}>
            <div className='flex flex-col'>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal dark:text-gray-200'
              >
                {title}
              </Typography>
              {/* <Typography
                variant='small'
                color='blue-gray'
                className='font-normal opacity-70 dark:text-gray-200'
              >
                Post
              </Typography> */}
            </div>
          </td>
          <td className={classes}>
            <AuthorCard authorId={userId} />
          </td>
          <td className={classes}>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal dark:text-gray-200'
            >
              {format(new Date(createdAt), 'MMM dd, yyyy')}
            </Typography>
          </td>
          <td className={classes}>
            <div className='w-max'>
              <Chip
                size='sm'
                value={status == 'published' ? 'published' : 'draft'}
                color={status == 'published' ? 'green' : 'blue-gray'}
              />
            </div>
          </td>
          <td className={classes}>
            <Link to={`/wt-content/posts/edit/${id}`}>
              <Tooltip
                content='Edit Post'
                className='dark:text-gray-900 dark:bg-gray-100'
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 }
                }}
              >
                <IconButton
                  variant='text'
                  className='dark:hover:bg-blue-gray-800 dark:text-gray-200'
                >
                  <PencilSquareIcon width={20} />
                </IconButton>
              </Tooltip>
            </Link>
            {(roleName == 'ADMIN' || roleName == 'EDITOR') && (
              <Link to={`/wt-content/posts/delete/${id}`}>
                <Tooltip
                  content='Delete Post'
                  className='dark:text-gray-900 dark:bg-gray-100'
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 }
                  }}
                >
                  <IconButton
                    variant='text'
                    className='dark:hover:bg-blue-gray-800 dark:text-gray-200'
                  >
                    <TrashIcon width={20} />
                  </IconButton>
                </Tooltip>
              </Link>
            )}
          </td>
        </tr>
      )
    }
  )
}
