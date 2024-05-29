import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import defaultProfile from '../../assets/img/default-avatar.jpg'
import defaultImage from '../../assets/img/default-image.png'
import userService from '../../services/userService'
import {
  Avatar,
  Chip,
  IconButton,
  Spinner,
  Tooltip,
  Typography
} from '@material-tailwind/react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

export default function TableAdmin({ posts }) {
  return posts.map(
    ({ id, thumbnail, title, userId, createdAt, status }, index) => {
      const isLast = index === posts.length - 1
      const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50'

      return (
        <tr key={title}>
          <td className={classes}>
            <img
              className='h-14 w-14 rounded-lg object-cover object-center mx-auto'
              src={thumbnail ?? defaultImage}
              alt='Post image'
            />
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
            <Link to={`/wt-content/posts/delete/${id}`}>
              <Tooltip content='Delete Post'>
                <IconButton variant='text'>
                  <TrashIcon className='h-4 w-4' />
                </IconButton>
              </Tooltip>
            </Link>
          </td>
        </tr>
      )
    }
  )
}

function AuthorCard({ authorId }) {
  const [author, setAuthor] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getAuthor() {
      try {
        const response = await userService.getUserById(authorId)

        if (!response.ok) {
          throw new Error('An error occurred while fetching the author')
        }

        setAuthor(response.body)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    getAuthor()
  }, [authorId])

  return loading ? (
    <Spinner size='sm' color='blue-gray' />
  ) : (
    <div className='flex items-center gap-3'>
      <Avatar
        src={
          author.picture
            ? `${import.meta.env.VITE_API_BASE_URL}/avatars/${author.picture}`
            : defaultProfile
        }
        alt='Author picture'
        size='sm'
      />
      <div className='flex flex-col'>
        <Typography variant='small' color='blue-gray' className='font-normal'>
          {author.displayName}
        </Typography>
        <Typography
          variant='small'
          color='blue-gray'
          className='font-normal opacity-70'
        >
          {author.email}
        </Typography>
      </div>
    </div>
  )
}
