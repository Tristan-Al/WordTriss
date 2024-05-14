import express from 'express'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getPosts
} from '../controllers/category.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.get('/', getAllCategories)
router.get('/:categoryId', getCategoryById)
router.get('/:id/posts', getPosts)
router.post('/', checkToken, createCategory)
router.put('/:categoryId', checkToken, updateCategory)
router.delete('/:categoryId', checkToken, deleteCategory)

export default router
