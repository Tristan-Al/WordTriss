import React, { useEffect, useState } from 'react'
import postService from '../../../services/postService'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import AdminHeader from '../../../components/Headers/AdminHeader'
import TableAdmin from '../../../components/Tables/TableAdmin'

const PostsDashboard = () => {
  const { displayName, picture } = useAuth()

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
      <AdminHeader
        path={'posts'}
        userDisplayName={displayName}
        userPic={picture}
      />
      <TableAdmin posts={posts} />
    </>
  )
}

export default PostsDashboard
