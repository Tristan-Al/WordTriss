import { User } from '../models/user.model.js'
import { Post } from '../models/post.model.js'
import { Category } from '../models/category.model.js'
import { Tag } from '../models/tag.model.js'
import { Comment } from '../models/comment.model.js'
import { formatPost, formatUser } from '../utils/utils.js'

/**
 * Get all users from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllUsers = async (req, res) => {
  User.findAll()
    .then((users) => res.json(users.map(formatUser)))
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Get user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getUserById = async (req, res) => {
  // Get user ID from request params
  const { userId } = req.params // Same as: userId = req.params.userId;

  // Get user by ID from DB
  User.findByPk(userId)
    .then((user) =>
      !user
        ? res.status(404).json({ message: 'User not found' })
        : res.json(formatUser(user))
    )
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Create new user in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createUser = async (req, res) => {
  // Destructure request body to get values
  const { displayName, username, password, confirmPassword, email } = req.body

  // Validate the fields
  if (
    !User.validateAllFields(
      displayName,
      username,
      password,
      confirmPassword,
      email
    )
  ) {
    return res.status(400).json({ message: 'Invalid fields' })
  }

  // Insert user in DB
  User.create({
    display_name: displayName,
    username,
    password: User.encryptPassword(password),
    email
  })
    .then((newUser) => res.json(newUser)) // Send user to response as JSON
    .catch((error) => res.status(500).json({ message: error.message })) // Send error message
}

/**
 * Update a user in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateUser = async (req, res) => {
  // Get user ID from request params
  const { userId } = req.params

  // Get current user from request
  const curUser = req.user

  // Get updated fields from request body
  const updatedUser = req.body

  // Validate the fields
  if (!User.validateSomeFields(updatedUser)) {
    return res.status(400).json({ message: 'All fields are required' })
  }

  // Check if user is updating his own profile or is an admin
  if (curUser.id != userId && curUser.roleName !== 'ADMIN') {
    return res
      .status(403)
      .json({ message: 'You can only update your own profile' })
  }

  // Check if user is updating his role and is not an admin
  if (updatedUser.role_id && curUser.roleName !== 'ADMIN') {
    return res
      .status(403)
      .json({ message: 'You are not allowed to update your role' })
  }

  // Check if user is updating his password
  if (updatedUser.password) {
    // Check if confirm password is not empty
    if (!updatedUser.confirm_password) {
      return res
        .status(400)
        .json({ message: 'Password and Confirm Password are required' })
    }
    // Check if password is valid
    if (!User.validatePassword(updatedUser.password)) {
      return res.status(400).json({ message: 'Invalid password format' })
    }
    // Check if password and confirm password match
    if (updatedUser.password !== updatedUser.confirm_password) {
      return res.status(400).json({ message: 'Passwords do not match' })
    }
    // Encrypt password
    updatedUser.password = User.encryptPassword(updatedUser.password)
  }

  // If user is updating his id
  if (updatedUser.id || updatedUser.user_id) {
    return res.status(403).json({ message: 'You can not to update your id' })
  }

  // Update user
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }

      // Update user data
      user.set(updatedUser)

      // Save it in DB
      user.save().then((updatedUser) => {
        delete updatedUser.password
        res.json(updatedUser)
      })
    })
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Delete a user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteUser = async (req, res) => {
  // Get user ID from params
  const { userId } = req.params

  // Get current user from request
  const curUser = req.user

  // Check if user is deleting his own profile or is an admin
  if (curUser.id != userId && curUser.roleName !== 'ADMIN') {
    return res
      .status(403)
      .json({ message: 'You can only delete your own profile' })
  }

  // Delete user from DB
  User.destroy({ where: { id: userId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        res.status(404).json({ message: 'User not found' })
      } else {
        // Send success message
        res.json({ message: 'User deleted successfully!' })
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }))
}

/**
 * Get posts from database by author
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getPosts = async (req, res) => {
  // Get author id from request params
  const { id } = req.params

  // Get posts from DB
  Post.findAll({
    where: { user_id: id },
    include: [
      { model: User },
      { model: Tag },
      { model: Category },
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
