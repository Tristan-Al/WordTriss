import express from 'express'
import categoryRoutes from './category.routes.js'
import tagRoutes from './tag.routes.js'
import postRoutes from './post.routes.js'
import pageRoutes from './pages.routes.js'
import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'
import commentRoutes from './comment.routes.js'

import { checkToken } from '../middlewares/auth.middlewares.js'

import upload from '../middlewares/multer.middlewares.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/categories', categoryRoutes)
router.use('/tags', tagRoutes)
router.use('/posts', postRoutes)
router.use('/pages', checkToken, pageRoutes) // Pending
router.use('/comments', commentRoutes)
router.post('/upload', [checkToken, upload], (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.')
  }

  // File was uploaded successfully
  res.send(`File uploaded: ${req.file.filename}`)
})
router.use('/avatars', express.static('src/uploads/avatars'))

router.use('/', authRoutes)

export default router
