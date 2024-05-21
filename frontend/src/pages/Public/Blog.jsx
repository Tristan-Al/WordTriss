import React, { useEffect, useState } from 'react'
import BlogPostCard from '../../components/Cards/BlogPostCard'
import postService from '../../services/postService'

function Blog() {
  const [posts, setPosts] = useState([])

  /**
   * This only runs once when the component mounts
   * It fetches the posts from the server
   * and saves in the posts state
   */
  useEffect(() => {
    async function getPosts() {
      try {
        // Fetch the posts from the server
        const posts = await postService.getAllPosts()
        // Save the posts in the state
        setPosts(posts)
      } catch (error) {
        // If there's an error, set the error message
        console.log(error)
      }
    }

    getPosts()
  }, [])

  return (
    <div className='container mx-auto py-5 px-3 sm:px-2 flex flex-col gap-2'>
      {posts.map((post) => (
        <div id={'post-' + post.id} key={post.id}>
          <BlogPostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default Blog
