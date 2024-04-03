import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Role, ROLES } from "../models/role.model.js";

/**
 * Verify the JWT token.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const checkToken = async (req, res, next) => {
  // Get token from request headers
  const token = req.headers["authorization"];

  // Check token
  if (!token) {
    // If there isn't token, send 403 status code and message
    return res
      .status(403)
      .json({ message: "You must include authorization header" });
  }

  // Verify the token with secret key
  let obj;
  try {
    obj = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.json({ error: error.message });
  }

  const user = await User.findByPk(obj.user_id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // If the user is found, save to req variable and continue
  req.user = user;
  next();
};

/**
 * Verify if the user has the admin role.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role_id !== ROLES.ADMIN) {
    return res.status(403).json({ message: "Unauthorized admin required" });
  }

  next(); // Call the next middleware
};

/**
 * Verify if the role id exists in the database.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const isValidRoleId = async (req, res, next) => {
  // Get the role id from the request body
  const { roleId } = req.body;

  // Validate the role id exists
  if (!roleId) {
    return res.status(400).json({ message: "Role id is required" });
  }

  // Find the role in the database
  Role.findByPk(roleId)
    .then((role) => {
      // If the role is not found, send a 404 status code and a message
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }

      next(); // Call the next middleware
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Verify that the necessary fields are not empty.
 * - Necessary fields: username, password
 * - If the fields are empty, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const verifyNecessaryFields = (req, res, next) => {
  // Get the username and password from the request body
  const { username, password } = req.body;

  // If the fields are undefined, null or empty, send a 400 status code and a message
  if (!username?.trim() || !password?.trim()) {
    res
      .status(400)
      .json({ message: "The fields username & password are required" });
    return;
  }

  next(); // Call the next middleware
};

/**
 * Verify username and password for authentication.
 * - If the credentials are invalid, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const authenticateUser = async (req, res, next) => {
  // Get the username and password from the request body
  const { username, password } = req.body;

  try {
    // Find the user in the database
    const user = await User.findOne({ where: { username } });

    // If the user does not exist, or the password is incorrect, send a 400 status code and a message
    if (!user || !User.comparePassword(password, user.password)) {
      return res.status(400).json({ message: "Incorrect username/password" });
    }

    // Attach the user to the request object to use in the method signIn to generate the token
    req.user = user;

    next(); // Call the next middleware
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Server error" });
  }
};

/**
 * Verify that the necessary fields are not empty.
 * - Necessary fields: displayName, username, password, email
 * - If the fields are empty, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const verifyAllFields = (req, res, next) => {
  // Get the username, email and password from the request body
  const { displayName, username, password, email, confirmPassword } = req.body;

  if (
    !User.validateAllFields(
      displayName,
      username,
      password,
      email,
      confirmPassword,
    )
  ) {
    res.status(400).json({ message: "All fields are empty" });
    return;
  }

  next(); // Call the next middleware
};

/**
 * Verify that the username  are not already in use.
 * - If the username are already in use, send a 400 status code and a message.
 * @param {*} req The request object
 * @param {*} res The response object
 * @param {*} next The next middleware function
 */
export const checkDuplicateUsername = async (req, res, next) => {
  // Get the username from the request body
  const { username } = req.body;

  // Check if the username already exists
  const user = await User.exists(username);

  if (user) {
    res.status(400).json({ message: "The username already exists" });
    return;
  }

  next(); // Call the next middleware
};
