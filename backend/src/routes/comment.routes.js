import express from "express";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// CRUD ------------------------------------------------------------------------
router.get("/", getAllComments);
router.post("/", createComment);
router.put("/:categoryId", updateComment);
router.delete("/:categoryId", deleteComment);
export default router;
