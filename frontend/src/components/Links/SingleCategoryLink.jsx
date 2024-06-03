import React, { useEffect, useState } from 'react'
import categoryService from '../../services/categoryService'
import { Link } from 'react-router-dom'

export default function SingleCategoryLink({ categoryId }) {
  const [category, setCategory] = useState({})

  useEffect(() => {
    async function getCategory() {
      try {
        const category = await categoryService.getCategoryById(categoryId)
        setCategory(category)
      } catch (error) {
        console.error(error)
      }
    }

    getCategory()
  }, [categoryId])

  return (
    <>
      <Link
        key={categoryId}
        className='px-4 py-1 mr-2 mb-2 bg-black text-gray-200 inline-flex items-center justify-center rounded-sm transition hover:bg-white hover:text-black'
        to={`/categories/${categoryId}`}
      >
        {category.name}
      </Link>
    </>
  )
}
