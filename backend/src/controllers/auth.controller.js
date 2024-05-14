import { User } from '../models/user.model.js'
import { createToken } from '../utils/utils.js'

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
      console.error(`User not found: ${username}`)
      // Send error message
      return res
        .status(404)
        .json({ message: 'Incorrect username or password', token: null })
    }

    console.log(
      `\t User found {ID: ${user.id}, displayName: ${user.display_name}, email: ${user.email}`
    )

    // Check password
    if (!User.comparePassword(password, user.password)) {
      console.error(`\t Password doesn't match : ${password}`)
      return res
        .status(400)
        .json({ message: 'Incorrect username or password', token: null })
    }

    // Success
    res.json({
      message: 'Login successfully!',
      token: createToken(user)
    })
  } catch (error) {
    console.error(`Error in login function: `, error.message)
    res.status(500).json({ message: error.message, token: null })
  }
}
