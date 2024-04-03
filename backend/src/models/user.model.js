import { DataTypes } from "sequelize";
import { db } from "../config/database.js";
import { Role } from "./role.model.js";
import bcrypt from "bcryptjs";

export const User = db.define(
  "users",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    display_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      isEmail: true,
    },
    biography: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING(100),
      allowNull: false,
      isEmail: true,
    },
    role_id: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    timestamps: true, // Enable timestamps
    createdAt: "created_at", // Modify name for createdAt column
    updatedAt: "updated_at", // Modify name for updatedAt column
  },
);

// N:1 Relationship between User and Role
User.belongsTo(Role, {
  foreignKey: "role_id",
  onDelete: "SET DEFAULT",
  onUpdate: "CASCADE",
});

/** ------------------------------------------------------
 * User Functions and Validations
 * ---------------------------------------------------- */
/**
 * Validate all fields are not null or empty and the passwords are the same to create a new user
 * @param {String} displayName The name of user to validate
 * @param {String} username The name to validate (Unique)
 * @param {String} password The password to validate
 * @param {String} confirmPassword The confirm password to validate
 * @param {String} email The email to validate
 * @return {Boolean} True if all fields are valid
 */
User.validateAllFields = (
  displayName,
  username,
  password,
  confirmPassword,
  email,
) => {
  // Check if any field is null or empty
  const isValid = [
    displayName,
    username,
    password,
    confirmPassword,
    email,
  ].every((field) => field?.trim().length > 0);

  // Check if passwords match
  const passwordsMatch = password === confirmPassword;

  return isValid && passwordsMatch;
};

/**
 * Validate the username is unique in the database
 * @param {String} username The username user to validate
 * @return {Boolean} True if the username is valid
 */
User.exists = async (username) => {
  return await User.findOne({ where: { username } });
};

/**
 * Encrypt the password using bcrypt
 * @param {String} password The password to encrypt
 * @returns {String} The encrypted password
 */
User.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

/**
 * Compare the password with the received password
 * @param {String} password The password to compare
 * @param {String} receivedPassword The received password to compare (encrypted)
 * @returns {Boolean} True if the password is correct, false otherwise
 */
User.comparePassword = (password, receivedPassword) => {
  return bcrypt.compareSync(password, receivedPassword);
};
