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
                className='font-normal'
              >
                {title}
              </Typography>
              <Typography
                variant='small'
                color='blue-gray'
                className='font-normal opacity-70'
              >
                org
              </Typography>
            </div>
          </td>
          <td className={classes}>
            <AuthorCard authorId={userId} />
          </td>
          <td className={classes}>
            <Typography
              variant='small'
              color='blue-gray'
              className='font-normal'
            >
              {format(new Date(createdAt), 'MMM dd, yyyy')}
            </Typography>
          </td>
          <td className={classes}>
            <div className='w-max'>
              <Chip
                variant='ghost'
                size='sm'
                value={status == 'published' ? 'published' : 'draft'}
                color={status == 'published' ? 'green' : 'blue-gray'}
              />
            </div>
          </td>
          <td className={classes}>
            <Link to={`/wt-content/posts/edit/${id}`}>
              <Tooltip content='Edit Post'>
                <IconButton variant='text'>
                  <PencilSquareIcon className='h-4 w-4' />
                </IconButton>
              </Tooltip>
            </Link>
            {(roleName === 'ADMIN' || roleName === 'EDITOR') ?? (
              <Link to={`/wt-content/posts/delete/${id}`}>
                <Tooltip content='Delete Post'>
                  <IconButton variant='text'>
                    <TrashIcon className='h-4 w-4' />
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
