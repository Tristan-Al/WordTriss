import express from 'express'
import {
  createPost,
  getPostById,
  deletePost,
  getAllPosts,
  updatePost
} from '../controllers/post.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.get('/', getAllPosts)
router.get('/:postId', getPostById)
router.post('/', checkToken, createPost)
router.put('/:postId', checkToken, updatePost)
router.delete('/:postId', checkToken, deletePost)

export default router
