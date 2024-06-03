import React from 'react'
import { Link } from 'react-router-dom'
import BlogCategoryLink from '../Links/BlogCategoryLink'
import { usePostThumbnailPreview } from '../../hooks/useImagePreview'
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button
} from '@material-tailwind/react'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

export default function BlogPostCard({ post }) {
  const preview = usePostThumbnailPreview(post.thumbnail)

  return (
    <Card className='w-full flex-row'>
      <CardHeader
        shadow={false}
        floated={false}
        className='m-0 w-2/5 h-96 shrink-0 rounded-r-none'
      >
        <img
          src={preview}
          alt='thumbnail'
          className='w-full h-full object-cover object-center'
        />
      </CardHeader>
      <CardBody>
        {
          // Check if there are categories
          post.categories.length > 0 && (
            <div className='flex flex-wrap gap-1 uppercase mb-4'>
              {post.categories.map((categoryId) => (
                <BlogCategoryLink categoryId={categoryId} key={categoryId} />
              ))}
            </div>
          )
        }
        <Typography variant='h4' color='blue-gray' className='mb-4'>
          {post.title}
        </Typography>
        <div
          className='mb-8 font-normal text-justify'
          dangerouslySetInnerHTML={{
            __html:
              post.content.length > 200
                ? `${post.content.slice(0, 200)}...`
                : post.content
          }}
        />
        <Link to={`/posts/${post.id}`}>
          <Button variant='outlined' className='flex items-center gap-2'>
            <span>Read more</span>
            <ArrowLongRightIcon width={18} />
          </Button>
        </Link>
      </CardBody>
    </Card>
  )
}
