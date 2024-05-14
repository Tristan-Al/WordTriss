import express from 'express'
import {
  createTag,
  deleteTag,
  getAllTags,
  getPosts,
  getTagById,
  updateTag
} from '../controllers/tag.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.get('/', getAllTags)
router.get('/:tagId', getTagById)
router.get('/:id/posts', getPosts)
router.post('/', checkToken, createTag)
router.put('/:tagId', checkToken, updateTag)
router.delete('/:tagId', checkToken, deleteTag)

export default router
