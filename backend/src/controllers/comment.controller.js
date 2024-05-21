import { Comment } from '../models/comment.model.js'
import { User } from '../models/user.model.js'
import { formatComment } from '../utils/utils.js'

/**
 * Get all comments from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllComments = async (req, res) => {
  Comment.findAll()
    .then((comments) => res.json(comments.map(formatComment)))
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Get comment from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getCommentById = async (req, res) => {
  // Get comment ID from request params
  const { commentId } = req.params // Same as: commentId = req.params.commentId;

  // Get comment by ID from DB
  Comment.findByPk(commentId)
    .then((comment) =>
      !comment
        ? res.status(404).json({ message: 'Comment not found' })
        : res.json(formatComment(comment))
    )
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Create new comment in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createComment = async (req, res) => {
  // Destructure request body to get values
  const { content, status, userId, postId, parentId } = req.body

  // Validate the fields
  if (!Comment.validateAllFields(content, status, userId, postId, parentId)) {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  // Check if user exists
  const user = await User.findByPk(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Insert comment in DB
  Comment.create({
    content,
    status,
    user_id: userId,
    post_id: postId,
    parent_id: parentId
  })
    .then((comment) => res.json(formatComment(comment)))
    .catch((error) => res.status(503).json({ error: error.message }))
}

/**
 * Update a comment in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateComment = async (req, res) => {
  // Get comment ID from request params
  const { commentId } = req.params // Same as: commentId = req.params.commentId;

  // Destructute request body to get values
  const { content, status, userId, postId, parentId } = req.body

  // Validate the fields
  if (!Comment.validateAllFields(content, status, userId, postId, parentId)) {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  // Check if user exists
  const user = await User.findByPk(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // Update the comment
  Comment.findByPk(commentId)
    .then((comment) => {
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' })
      }

      return comment.update({
        content,
        status,
        user_id: userId,
        post_id: postId,
        parent_id: parentId
      })
    })
    .then((comment) => res.json(formatComment(comment)))
    .catch((error) => res.status(503).json({ error: error.message }))
}

/**
 * Delete a comment from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteComment = async (req, res) => {
  // Get comment ID from request params
  const { commentId } = req.params // Same as: commentId = req.params.commentId;

  // Delete comment from DB
  Comment.destroy({ where: { id: commentId } })
    .then((num) =>
      num === 1
        ? res.json({ message: 'Comment was deleted successfully' })
        : res.status(404).json({ message: 'Comment not found' })
    )
    .catch((error) => res.status(503).json({ error: error.message }))
}
