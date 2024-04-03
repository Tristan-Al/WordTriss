import { User } from "../models/user.model.js";
import { Role } from "../models/role.model.js";
import { createToken } from "../utils/utils.js";

/**
 * Get all users from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllUsers = async (req, res) => {
  User.findAll()
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Get user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getUserById = async (req, res) => {
  // Get user ID from request params
  const { userId } = req.params; // Same as: userId = req.params.userId;

  // Get user by ID from DB
  User.findByPk(userId)
    .then((user) =>
      !user
        ? res.status(404).json({ message: "User not found" })
        : res.json(user),
    )
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Create new user in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createUser = async (req, res) => {
  // Destructure request body to get values
  const { displayName, username, password, confirmPassword, email } = req.body;

  // Validate the fields
  if (
    !User.validateAllFields(
      displayName,
      username,
      password,
      confirmPassword,
      email,
    )
  ) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  // Insert user in DB
  User.create({
    display_name: displayName,
    username,
    password: User.encryptPassword(password),
    email,
  })
    .then((newUser) => res.json(newUser)) // Send user to response as JSON
    .catch((error) => res.status(500).json({ message: error.message })); // Send error message
};

/**
 * Update a user in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateUser = async (req, res) => {
  // Get user ID from request params
  const { userId } = req.params;

  // Destructure request body to get values
  const { displayName, username, password, confirmPassword, email } = req.body;

  // Validate the fields
  if (
    !User.validateAllFields(
      displayName,
      username,
      password,
      confirmPassword,
      email,
    )
  ) {
    return res.status(400).json({ message: "Invalid fields" });
  }

  const { roleId } = req.params;
  let role = null;
  if (roleId) {
    role = await Role.findByPk(roleId);
  }

  // Update user
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Update user data
      user.set({
        displayName,
        username,
        password,
        confirmPassword,
        email,
        role_id: roleId,
      });

      // Save it in DB
      user.save().then((updatedUser) => res.json(updatedUser));
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Delete a user from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteUser = async (req, res) => {
  // Get user ID from params
  const { userId } = req.params;

  // Delete user from DB
  User.destroy({ where: { id: userId } })
    .then((num) => {
      if (num === 0) {
        // Send error message
        res.status(404).json({ message: "User not found" });
      } else {
        // Send success message
        res.json({ message: "User deleted successfully!" });
      }
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Login and generate the token for the user.
 * @param {*} req The request object
 * @param {*} res The response object
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ username });

    // Check if we have a user
    if (!user) {
      // Send error message
      return res
        .status(404)
        .json({ message: "Incorrect username or password", token: null });
    }

    // Check password
    if (!User.comparePassword(password, user.password)) {
      return res
        .status(400)
        .json({ error: "Incorrect username or password", token: null });
    }

    // Success
    res.json({
      success: "Login successfully!",
      token: createToken(user),
    });
  } catch (error) {
    res.status(500).json({ message: error.message, token: null });
  }
};
