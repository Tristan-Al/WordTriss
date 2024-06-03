import React, { useEffect, useState } from 'react'
import BlogPostCard from '../../components/Cards/BlogPostCard'
import postService from '../../services/postService'
import { Spinner } from '@material-tailwind/react'

function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  /**
   * This only runs once when the component mounts
   * It fetches the posts from the server
   * and saves in the posts state
   */
  useEffect(() => {
    async function getPosts() {
      try {
        // Fetch the posts from the server
        const response = await postService.getAllPosts()

        if (!response.ok) {
          console.log('Failed to get posts')
          return
        }

        // Extract the posts from the response
        const posts = response.body.posts

        // Save the posts in the state
        setPosts(posts)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.error('Error getting posts', error)
        toast.showError('Error getting posts')
      }
    }

    getPosts()
  }, [])

  return loading ? (
    <div className='flex justify-center pt-10'>
      <Spinner />
    </div>
  ) : (
    <div className='flex flex-col gap-4'>
      {posts.map((post) => (
        <div id={'post-' + post.id} key={post.id}>
          <BlogPostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default Blog
