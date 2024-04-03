import { DataTypes } from "sequelize";
import { db } from "../config/database.js";

// Define all roles types
export const ROLES = {
  USER: 1,
  ADMIN: 2,
  EDITOR: 3,
  AUTHOR: 4,
  CONTRIBUTOR: 5,
  SUBSCRIBER: 6,
};

export const Role = db.define(
  "roles",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: true, // Enable timestamps
    createdAt: "created_at", // Modify name for createdAt column
    updatedAt: "updated_at", // Modify name for updatedAt column
  },
);
