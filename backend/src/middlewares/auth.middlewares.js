import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { Role } from '../models/role.model.js'

/**
 * Verify the JWT token.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const checkToken = async (req, res, next) => {
  // Get token from request headers
  const token = req.headers['authorization']

  // Check token
  if (!token) {
    // If there isn't token, send 403 status code and message
    return res
      .status(403)
      .json({ message: 'You must include authorization header' })
  }

  // Verify the token with secret key
  let obj
  try {
    obj = jwt.verify(token, process.env.SECRET_KEY)
  } catch (error) {
    return res.json({ error: error.message })
  }

  const user = await User.findByPk(obj.user_id)
  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  // If the user is found, save to req variable and continue
  req.user = user
  next()
}
