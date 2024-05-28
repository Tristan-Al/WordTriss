import { User } from '../models/user.model.js'
import { Post } from '../models/post.model.js'
import { Category } from '../models/category.model.js'
import { Tag } from '../models/tag.model.js'
import { Comment } from '../models/comment.model.js'
import { formatPost, formatUser } from '../utils/utils.js'
import {
  errorHandler,
  successHandler
} from '../middlewares/response.middlewares.js'

/**
 * Get all users from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllUsers = async (req, res) => {
  User.findAll()
    .then((users) => successHandler(users.map(formatUser), req, res))
    .catch((error) =>
      errorHandler(
        { message: error.message, details: 'Internal Server Error' },
        req,
        res
      )
    )
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
        ? errorHandler({ statusCode: 404, message: 'No user found' }, req, res)
        : successHandler(formatUser(user), req, res)
    )
    .catch((error) =>
      errorHandler(
        { message: error.message, details: 'Internal Server Error' },
        req,
        res
      )
    )
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
    return errorHandler(
      { statusCode: 400, message: 'Invalid fields' },
      req,
      res
    )
  }

  // Insert user in DB
  User.create({
    display_name: displayName,
    username,
    password: User.encryptPassword(password),
    email
  })
    .then((newUser) => successHandler(formatUser(newUser), req, res)) // Send user to response as JSON
    .catch((error) =>
      errorHandler(
        { message: error.message, details: 'Internal Server Error' },
        req,
        res
      )
    ) // Send error message
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

  try {
    console.log('Updating user:', updatedUser)
    // Validate the fields
    if (!User.validateSomeFields(updatedUser)) {
      errorHandler(
        { statusCode: 400, message: 'All fields must be not empty' },
        req,
        res
      )
    }

    // Check if user is updating his own profile or is an admin
    if (curUser.id != userId && curUser.roleName !== 'ADMIN') {
      return errorHandler(
        { statusCode: 403, message: 'You can only update your own profile' },
        req,
        res
      )
    }

    // Check if user is updating his role and is not an admin
    if (updatedUser.role_id && curUser.roleName !== 'ADMIN') {
      return errorHandler(
        { statusCode: 403, message: 'You are not allowed to update your role' },
        req,
        res
      )
    }

    // Check if user is updating his password
    if (updatedUser.password) {
      // Check if confirm password is not empty
      if (!updatedUser.confirm_password) {
        return errorHandler(
          {
            statusCode: 403,
            message: 'Password and Confirm Password are required'
          },
          req,
          res
        )
      }
      // Check if password is valid
      if (!User.validatePassword(updatedUser.password)) {
        return errorHandler(
          {
            statusCode: 403,
            message: 'Invalid password format',
            details:
              'Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter and 1 number.'
          },
          req,
          res
        )
      }
      // Check if password and confirm password match
      if (updatedUser.password !== updatedUser.confirm_password) {
        return errorHandler(
          { statusCode: 400, message: 'Passwords do not match' },
          req,
          res
        )
      }
      // Encrypt password
      updatedUser.password = User.encryptPassword(updatedUser.password)
    }

    // If user is updating his id
    if (updatedUser.id || updatedUser.user_id) {
      return errorHandler(
        { statusCode: 403, message: 'You can not to update your id' },
        req,
        res
      )
    }

    // Update user
    User.findByPk(userId).then((user) => {
      if (!user) {
        return errorHandler(
          { statusCode: 404, message: 'No user found' },
          req,
          res
        )
      }

      // Update user data
      user.set(updatedUser)

      // Save it in DB
      user.save().then((updatedUser) => {
        successHandler(formatUser(updatedUser), req, res)
      })
    })
  } catch (error) {
    return errorHandler(
      { message: error.message, details: 'Internal Server Error' },
      req,
      res
    )
  }
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
    return errorHandler(
      { statusCode: 403, message: 'You can only delete your own profile' },
      req,
      res
    )
  }

  // Delete user from DB
  User.destroy({ where: { id: userId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        return errorHandler(
          { statusCode: 404, message: 'No user found' },
          req,
          res
        )
      } else {
        // Send success message
        return successHandler('User deleted successfully', req, res)
      }
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
        return errorHandler(
          { statusCode: 404, message: 'No posts found' },
          req,
          res
        )
      }

      // Format response as JSON
      const formattedPosts = posts.map(formatPost)

      // Send post in response as JSON
      return successHandler(formattedPosts, req, res)
    })
    .catch((error) =>
      errorHandler(
        { message: error.message, details: 'Internal Server Error' },
        req,
        res
      )
    )
}
