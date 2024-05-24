import express from 'express'
import {
  createComment,
  deleteComment,
  getAllComments,
  getCommentById,
  updateComment
} from '../controllers/comment.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'
import { checkRole } from '../middlewares/role.middlewares.js'

const router = express.Router()

router.get('/', getAllComments)
router.get('/:commentId', getCommentById)
router.post('/', createComment)
router.put(
  '/:commentId',
  [checkToken, checkRole(['EDITOR', 'ADMIN'])],
  updateComment
)
router.delete(
  '/:commentId',
  [checkToken, checkRole(['EDITOR', 'ADMIN'])],
  deleteComment
)
export default router
