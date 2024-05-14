import express from 'express'
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from '../controllers/comment.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

// CRUD ------------------------------------------------------------------------
router.get('/', getAllComments)
router.post('/', checkToken, createComment)
router.put('/:categoryId', checkToken, updateComment)
router.delete('/:categoryId', checkToken, deleteComment)
export default router
