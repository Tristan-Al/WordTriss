import { Post } from '../models/post.model.js'
import { Category } from '../models/category.model.js'
import { Tag } from '../models/tag.model.js'
import { Comment } from '../models/comment.model.js'
import { formatPost } from '../utils/utils.js'
import {
  errorHandler,
  successHandler
} from '../middlewares/response.middlewares.js'
import { Op } from 'sequelize'

/**
 * Get all posts from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllPosts = async (req, res) => {
  const {
    page = 1,
    limit = process.env.LIMIT || 10,
    order = 'DESC',
    status = 'all'
  } = req.query
  const offset = (page - 1) * limit

  // Filter status
  const statusFilter =
    status === 'all' ? { [Op.in]: ['published', 'draft'] } : status

  try {
    // Get the total count of posts
    const totalCount = await Post.count({
      where: {
        status: statusFilter
      }
    })

    // Get all posts from DB
    const posts = await Post.findAll({
      include: [{ model: Category }, { model: Tag }, { model: Comment }],
      offset,
      limit: parseInt(limit),
      where: {
        status: statusFilter
      },
      order: [['created_at', order]]
    })

    // Check if posts were found
    if (!posts || posts.length === 0) {
      // Return error
      return errorHandler(
        { statusCode: 404, message: 'No posts found' },
        req,
        res
      )
    }

    // Format post
    const formattedPosts = posts.map(formatPost)

    // Calculate total pages
    const totalPages = Math.ceil(totalCount / limit)

    // Send posts in response as JSON
    return successHandler(
      {
        posts: formattedPosts,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: totalCount
        }
      },
      req,
      res
    )
  } catch (error) {
    return errorHandler(
      { message: error.message, details: 'Internal Server Error' },
      req,
      res
    )
  }
}

/**
 * Get post from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getPostById = async (req, res) => {
  // Get post ID from request params
  const { postId } = req.params // Same as: postId = req.params.postId;

  // Get post by ID from DB
  Post.findByPk(postId, {
    include: [{ model: Category }, { model: Tag }, { model: Comment }]
  })
    .then((post) => {
      // Check if a post was founded
      if (!post) {
        // Return error with errorHandler middleware
        return errorHandler(
          { statusCode: 404, message: 'No post found' },
          req,
          res
        )
      }

      // Format response as JSON
      const formattedPost = formatPost(post)

      // Send post in response as JSON
      return successHandler(formattedPost, req, res)
    })
    .catch((error) =>
      errorHandler(
        { message: error.message, details: 'Internal Server Error' },
        req,
        res
      )
    )
}

/**
 * Create new post in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createPost = async (req, res) => {
  try {
    // Insert post in DB
    const [result] = await insert(req.body)

    // Get the new post ( returns an array )
    const [posts] = await getById(result.insertId)

    // Get first occurrence and send it
    const formattedPost = formatPost(posts[0])

    return successHandler(formattedPost, req, res)
  } catch (error) {
    // Send error message
    res.status(503).json({ ok: false, error: error.message })
  }
}

/**
 * Update a post in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updatePost = async (req, res) => {
  try {
    // Get post ID from request params
    const { postId } = req.params // Same as: postId = req.params.postId;
    // Update the post
    const [result] = await updateById(postId, req.body)
    // Get updated post from DB ( returns an array )
    const [posts] = await getById(result.insertId)
    // Get first occurrence and send it
    const formattedPost = formatPost(posts[0])

    return successHandler(formattedPost, req, res)
  } catch (error) {
    // Send error message
    res.status(503).json({ ok: false, error: error.message })
  }
}

/**
 * Delete a post from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deletePost = async (req, res) => {
  try {
    // Get post ID from params
    const { postId } = req.params
    // Delete post from DB
    await deleteById(postId)
    // Send success message
    return successHandler('Post deleted successfully', req, res)
  } catch (error) {
    // Send error message
    errorHandler(
      { message: error.message, details: 'Internal Server Error' },
      req,
      res
    )
  }
}
