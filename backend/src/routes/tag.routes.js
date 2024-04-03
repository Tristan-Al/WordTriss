import express from "express";
import {
  createTag,
  deleteTag,
  getAllTags,
  getTagById,
  updateTag,
} from "../controllers/tag.controller.js";

const router = express.Router();

router.get("/", getAllTags);
router.get("/:tagId", getTagById);
router.post("/", createTag);
router.put("/:tagId", updateTag);
router.delete("/:tagId", deleteTag);

export default router;
