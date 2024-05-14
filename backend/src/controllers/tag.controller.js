import { Tag } from '../models/tag.model.js'
import { Post } from '../models/post.model.js'
import { User } from '../models/user.model.js'
import { Category } from '../models/category.model.js'
import { formatPost } from '../utils/utils.js'
import { Comment } from '../models/comment.model.js'

/**
 * Get all tags from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllTags = async (req, res) => {
  // Get all tags from DB
  Tag.findAll()
    .then((tag) => res.json(tag))
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Get tag from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getTagById = async (req, res) => {
  // Get tag ID from request params
  const { tagId } = req.params // Same as: tagId = req.params.tagId;

  // Get tag by ID from DB
  Tag.findByPk(tagId)
    .then((tag) =>
      !tag ? res.status(404).json({ message: 'Tag not found' }) : res.json(tag)
    )
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Create new tag in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createTag = async (req, res) => {
  // Destructure request body to get values
  const { name } = req.body

  // Validate the fields
  if (!Tag.isTagFieldsValid(name)) {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  // Insert tag in DB
  Tag.create({ name })
    .then((newTag) => res.json(newTag)) // Send tag to response as JSON
    .catch((error) => res.status(500).json({ message: error.message })) // Send error message
}

/**
 * Update a tag in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateTag = async (req, res) => {
  // Get tag ID from request params
  const { tagId } = req.params

  // Destructure request body to get values
  const { name } = req.body

  // Validate the fields
  if (!Tag.isTagFieldsValid(name)) {
    return res.status(500).json({ message: 'Invalid fields' })
  }

  // Update tag
  Tag.findByPk(tagId)
    .then((tag) => {
      // Check if tag exists
      if (!tag) {
        return res.status(404).json({ message: 'Tag not found' })
      }

      // Update tag data
      tag.set({ name })

      // Save it in DB
      tag.save().then((updatedTag) => res.json(updatedTag))
    })
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Delete a tag from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteTag = async (req, res) => {
  // Get tag ID from params
  const { tagId } = req.params

  // Delete tag from DB
  Tag.destroy({ where: { id: tagId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        res.status(404).json({ message: 'Tag not found' })
      } else {
        // Send success message
        res.json({ message: 'Tag deleted successfully!' })
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Get posts from database by tag
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getPosts = async (req, res) => {
  // Get category from request params
  const { id } = req.params

  // Get posts  from DB
  Post.findAll({
    include: [
      {
        model: Tag,
        through: {
          where: {
            tag_id: id
          }
        },
        required: true
      },
      { model: Category },
      { model: User },
      { model: Comment }
    ]
  })
    .then((posts) => {
      // Check if posts was founded
      if (!posts) {
        // Return error
        return res.status(404).json({ message: 'No posts found' })
      }

      // Format response as JSON
      const formattedPosts = posts.map(formatPost)

      // Send post in response as JSON
      res.json(formattedPosts)
    })
    .catch((error) => res.status(500).json({ message: error.message }))
}
