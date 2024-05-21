import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'
import tagService from '../../services/tagService'
import { Link } from 'react-router-dom'

export default function SingleTagLink({ tagId }) {
  const [tag, setTag] = useState({})

  useEffect(() => {
    async function getTag() {
      try {
        const tag = await tagService.getTagById(tagId)
        setTag(tag)
      } catch (error) {
        console.error(error)
      }
    }

    getTag()
  }, [tagId])

  return (
    <Link
      to={`/tags/${tagId}`}
      className='p-2 text-gray-700 text-sm bg-blue-200 mr-2 rounded hover:bg-blue-300'
      key={tagId}
    >
      {tag.name}
    </Link>
  )
}
