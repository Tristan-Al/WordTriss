import React, { useEffect, useState } from 'react'
import postService from '../../../services/postService'
import TableAdmin from '../../../components/Tables/TableAdmin'

const PostsDashboard = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let posts = await postService.getAllPosts()
      setPosts(posts)
    }

    fetchPosts()
  }, [])

  return (
    <>
      <TableAdmin posts={posts} />
    </>
  )
}

export default PostsDashboard
