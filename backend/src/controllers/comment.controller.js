import {
  deleteById,
  getAll,
  getById,
  insert,
  updateById,
} from "../models/comment.model.js";

/**
 * Get all comments from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllComments = async (req, res) => {
  try {
    // Get all comments from DB
    const [comments] = await getAll();
    // Send comments
    res.json(comments);
  } catch (error) {
    // Send error message
    res.status(503).json({ error: error.message });
  }
};

/**
 * Create new comment in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createComment = async (req, res) => {
  try {
    // Insert comment in DB
    const [result] = await insert(req.body);
    // Get the new comment ( returns an array )
    const [comments] = await getById(result.insertId);
    // Get first occurrence and send it
    res.json(comments[0]);
  } catch (error) {
    // Send error message
    res.status(503).json({ error: error.message });
  }
};

/**
 * Update a comment in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updateComment = async (req, res) => {
  try {
    // Get comment ID from request params
    const { commentId } = req.params; // Same as: commentId = req.params.commentId;
    // Update the comment
    const [result] = await updateById(commentId, req.body);
    // Get updated comment from DB ( returns an array )
    const [comments] = await getById(result.insertId);
    // Get first occurrence and send it
    res.json(comments[0]);
  } catch (error) {
    // Send error message
    res.status(503).json({ error: error.message });
  }
};

/**
 * Delete a comment from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deleteComment = async (req, res) => {
  try {
    // Get comment ID from params
    const { commentId } = req.params;
    // Delete comment from DB
    await deleteById(commentId);
    // Send success message
    res.json({ success: "Deleted successfully" });
  } catch (error) {
    // Send error message
    res.json({ error: error.message });
  }
};
