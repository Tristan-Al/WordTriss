import { User } from '../models/user.model.js'
import { createToken } from '../utils/utils.js'
import { Role } from '../models/role.model.js'
import {
  errorTokenHandler,
  successTokenHandler
} from '../middlewares/response.middlewares.js'

/**
 * Login and generate the token for the user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const login = async (req, res) => {
  try {
    console.log(`Initiating log in function:`)
    const { username, password } = req.body

    // Find the user in the database
    const user = await User.findOne({ where: { username } })

    console.log(`\t Trying to get user: ${username}`)

    // Check if we have a user
    if (!user) {
      console.error(`\t User not found: ${username}`)
      // Return error with errorHandler middleware
      return errorTokenHandler(
        { statusCode: 404, message: 'Incorrect username or password' },
        req,
        res
      )
    }

    // Check password
    if (!User.comparePassword(password, user.password)) {
      console.error(`\t Password doesn't match : ${password}`)
      // Return error with errorHandler middleware
      return errorTokenHandler(
        { statusCode: 404, message: 'Incorrect username or password' },
        req,
        res
      )
    }

    // Check the role
    const role = await Role.findByPk(user.role_id)
    if (!role) {
      console.error(`Role not found: ${user.role_id}`)
      // Return error with errorHandler middleware
      return errorTokenHandler(
        { statusCode: 404, message: 'Role not found' },
        req,
        res
      )
    }

    // Role found add to user object
    user.role_name = role.name

    // Success response with successTokenHandler middleware
    return successTokenHandler(createToken(user), req, res)
  } catch (error) {
    console.error(`Error in login function: `, error.message)
    return errorTokenHandler(error, req, res)
  }
}

/**
 * Refresh the token for the user. This is used when the token is expired.
 * @param {Object} req The request object
 * @param {Object} res The response object
 */
export const refreshToken = async (req, res) => {
  try {
    const { username } = req.body
    const user = req.user

    return successTokenHandler(createToken(user), req, res)
  } catch (error) {
    console.error(`Error in refresh token function: `, error.message)
    return errorTokenHandler(error, req, res)
  }
}
