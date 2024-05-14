import express from 'express'
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
  getPosts
} from '../controllers/user.controller.js'

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:userId', getUserById)
router.get('/:id/posts', getPosts)
router.post('/', createUser)
router.put('/:userId', updateUser)
router.delete('/:userId', deleteUser)

export default router
