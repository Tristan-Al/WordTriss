import { DataTypes } from 'sequelize'
import { db } from '../config/database.js'
import { User } from './user.model.js'

export const Comment = db.define(
  'comments',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('approved', 'pending'),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  },
  {
    timestamps: true, // Enable timestamps
    createdAt: 'created_at', // Modify name for createdAt column
    updatedAt: 'updated_at' // Modify name for updatedAt column
  }
)

// Relationship with Users
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

// Relationship with Comment
Comment.belongsTo(Comment, {
  foreignKey: 'parent_id',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
})

/**
 * Validate comment fields
 * @param {string} content The comment content
 * @param {string} status The comment status
 * @param {number} userId The user ID
 * @param {number} postId The post ID
 * @param {number} parentId The parent comment ID
 * @returns {boolean} Returns true if all fields are valid
 */
Comment.validateAllFields = (content, status, userId, postId, parentId) => {
  return content && status && userId && postId && parentId
}
