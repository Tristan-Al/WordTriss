import { User } from '../models/user.model.js'
import jwt from 'jsonwebtoken'

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

/**
 * Verify username and password for authentication.
 * - If the credentials are invalid, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const authenticateUser = async (req, res, next) => {
  // Get the username and password from the request body
  const { username, password } = req.body

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { username } })

    // If the user does not exist, or the password is incorrect, send a 400 status code and a message
    if (!user || !User.comparePassword(password, user.password)) {
      return res.status(400).json({ message: 'Incorrect username/password' })
    }

    // Attach the user to the request object to use in the method signIn to generate the token
    req.user = user

    next() // Call the next middleware
  } catch (error) {
    console.error('Error during authentication:', error)
    res.status(500).json({ error: 'Server error' })
  }
}
