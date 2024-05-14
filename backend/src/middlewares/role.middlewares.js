import { ROLES } from '../models/role.model.js'

/**
 * Verify if the user has the admin role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isAdmin = async (req, res, next) => {
  const user = req.user
  if (user.role_id !== ROLES.ADMIN) {
    return res.status(403).json({ message: 'Unauthorized admin required' })
  }

  next() // Call the next middleware
}

/**
 * Verify if the user has the editor role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isEditor = async (req, res, next) => {
  const user = req.user
  if (user.role_id !== ROLES.EDITOR) {
    return res.status(403).json({ message: 'Unauthorized editor required' })
  }

  next() // Call the next middleware
}

/**
 * Verify if the user has the author role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isAuthor = async (req, res, next) => {
  const user = req.user
  if (user.role_id !== ROLES.AUTHOR) {
    return res.status(403).json({ message: 'Unauthorized author required' })
  }

  next() // Call the next middleware
}

/**
 * Verify if the user has the contributor role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isContributor = async (req, res, next) => {
  const user = req.user
  if (user.role_id !== ROLES.CONTRIBUTOR) {
    return res
      .status(403)
      .json({ message: 'Unauthorized contributor required' })
  }

  next() // Call the next middleware
}

/**
 * Verify if the user has the subscriber role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isSubscriber = async (req, res, next) => {
  const user = req.user
  if (user.role_id !== ROLES.CONTRIBUTOR) {
    return res.status(403).json({ message: 'Unauthorized subscriber required' })
  }

  next() // Call the next middleware
}
