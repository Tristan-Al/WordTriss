import { Post } from "../models/post.model.js";

/**
 * Get all posts from database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getAllPosts = async (req, res) => {
  Post.findAll()
    .then((posts) => res.json(posts))
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Get post from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const getPostById = async (req, res) => {
  // Get post ID from request params
  const { postId } = req.params; // Same as: postId = req.params.postId;

  // Get post by ID from DB
  Post.findByPk(postId)
    .then((post) => {
      // Check if a post was founded
      if (!post) {
        // Return error
        return res.status(404).json({ message: "No post found" });
      }

      // Send post in response as JSON
      res.json(post);
    })
    .catch((error) => res.status(500).json({ message: error.message }));
};

/**
 * Create new post in database
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const createPost = async (req, res) => {
  try {
    // Insert post in DB
    const [result] = await insert(req.body);
    // Get the new post ( returns an array )
    const [posts] = await getById(result.insertId);
    // Get first occurrence and send it
    res.json(posts[0]);
  } catch (error) {
    // Send error message
    res.status(503).json({ error: error.message });
  }
};

/**
 * Update a post in database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const updatePost = async (req, res) => {
  try {
    // Get post ID from request params
    const { postId } = req.params; // Same as: postId = req.params.postId;
    // Update the post
    const [result] = await updateById(postId, req.body);
    // Get updated post from DB ( returns an array )
    const [posts] = await getById(result.insertId);
    // Get first occurrence and send it
    res.json(posts[0]);
  } catch (error) {
    // Send error message
    res.status(503).json({ error: error.message });
  }
};

/**
 * Delete a post from database by id
 * @param {*} req The request object from Express
 * @param {*} res The response object from Express
 */
export const deletePost = async (req, res) => {
  try {
    // Get post ID from params
    const { postId } = req.params;
    // Delete post from DB
    await deleteById(postId);
    // Send success message
    res.json({ success: "Deleted successfully" });
  } catch (error) {
    // Send error message
    res.json({ error: error.message });
  }
};
