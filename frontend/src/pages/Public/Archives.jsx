import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TableArchives from '../../components/Tables/TableArchives'
import categoryService from '../../services/categoryService'
import tagService from '../../services/tagService'
import userService from '../../services/userService'
import useAlertToast from '../../hooks/useToast'
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
  Typography
} from '@material-tailwind/react'
import DefaultPagination from '../../components/Pagination/DefaultPagination'
import postService from '../../services/postService'

export default function Archives() {
  const { topic, id } = useParams()

  const { toast } = useAlertToast()

  const [posts, setPosts] = useState([])
  const [url, setUrl] = useState({
    page: 1
  })
  const [pagination, setPagination] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPosts() {
      let response
      try {
        switch (topic) {
          case 'categories':
            response = await categoryService.getPosts(id, url)
            break
          case 'tags':
            response = await tagService.getPosts(id, url)
            break
          case 'authors':
            response = await userService.getPosts(id, url)
            break
          default:
            response = await postService.getAllPosts()
            break
        }

        if (!response.ok) {
          console.log(`No posts found for ${topic}`)
          if (response.statusCode !== 404) {
            return
          }
        }

        const posts = response.body.posts
        setPosts(posts)
        setPagination(response.body.pagination)
        setLoading(false)
      } catch (error) {
        console.error('Failed to get posts: ', error.message)
        toast.showError(error.message || 'Failed to get posts')
        setLoading(false)
      }
    }

    fetchPosts()
  }, [url, topic])

  return loading ? (
    <div className='flex justify-center pt-10'>
      <Spinner />
    </div>
  ) : (
    <Card className='w-full'>
      <CardHeader floated={false} shadow={false} className='rounded-none p-2'>
        <Typography variant='h3' color='blue-gray'>
          {topic.charAt(0).toUpperCase() + topic.slice(1)} Archives
        </Typography>
        <Typography variant='h5' color='gray'>
          {posts.length === 0 ? 'No' : pagination.totalItems} posts found
        </Typography>
      </CardHeader>
      <CardBody className='overflow-scroll px-0'>
        {posts.length === 0 ? (
          <Typography color='blue-gray' className='text-center mt-8'>
            No posts found
          </Typography>
        ) : (
          <TableArchives posts={posts} />
        )}
      </CardBody>
      <CardFooter className='flex items-center justify-between border-t border-blue-gray-50 p-4'>
        {loading ? (
          <Spinner size='sm' />
        ) : (
          <DefaultPagination {...pagination} url={url} setUrl={setUrl} />
        )}
      </CardFooter>
    </Card>
  )
}
