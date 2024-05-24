import express from 'express'
import { login, refreshToken } from '../controllers/auth.controller.js'
import { checkToken } from '../middlewares/auth.middlewares.js'

const router = express.Router()

router.post('/login', login)
router.post('/refresh-token', checkToken, refreshToken)

export default router
