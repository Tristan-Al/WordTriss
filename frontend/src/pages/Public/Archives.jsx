import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TableArchives from '../../components/Tables/TableArchives'
import categoryService from '../../services/categoryService'
import tagService from '../../services/tagService'
import userService from '../../services/userService'

function Archives() {
  const { topic, id } = useParams()
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let posts = []
      switch (topic) {
        case 'categories':
          posts = await categoryService.getPosts(id)
          break
        case 'tags':
          posts = await tagService.getPosts(id)
          break
        case 'authors':
          posts = await userService.getPosts(id)
          break
      }
      setPosts(posts)
    }

    fetchPosts()
  }, [topic, id])

  console.log(`Topic ${topic}, Posts found: ${posts.length}`, posts)
  return (
    <main className='container px-4 mx-auto'>
      <h2 className='text-3xl font-semibold text-gray-800 capitalize my-4'>
        {topic}: {posts.length} found
      </h2>
      <TableArchives posts={posts} />
    </main>
  )
}

export default Archives
