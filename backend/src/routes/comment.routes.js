import express from 'express'
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment
} from '../controllers/comment.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

// CRUD ------------------------------------------------------------------------
router.get('/', getAllComments)
router.get('/:commentId', getCommentById)
router.post('/', checkToken, createComment)
router.put('/:commentId', checkToken, updateComment)
router.delete('/:commentId', checkToken, deleteComment)
export default router
