import React, { useEffect, useState } from 'react'
import categoryService from '../../services/categoryService'
import { Link } from 'react-router-dom'

export default function BlogCategoryLink({ categoryId }) {
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
    <Link
      key={category.id}
      className='mr-2 px-2 py-1 text-slate-600 bg-slate-200 rounded-sm text-sm transition hover:bg-slate-300 hover:shadow-md'
      to={`/category/${category.id}`}
    >
      {category.name}
    </Link>
  )
}
