import React, { useEffect, useState } from 'react'
import postService from '../../../services/postService'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'
import AdminHeader from '../../../components/AdminHeader/AdminHeader'
import TableAdmin from '../../../components/Tables/TableAdmin'

const PostsDashboard = () => {
  const { toast } = useAlertToast()
  const { userId, displayName, username, email, roleId, isAdmin, picture } =
    useAuth()

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
