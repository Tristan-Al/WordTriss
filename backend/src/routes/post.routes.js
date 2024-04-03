import express from "express";
import {
  createPost,
  getPostById,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:postId", getPostById);
router.post("/", createPost);
router.put("/:postId", updatePost);
router.delete("/:postId", deletePost);

export default router;
