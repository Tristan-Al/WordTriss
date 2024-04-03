import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/login", login);
router.get("/:userId", getUserById);
router.post("/", createUser);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

export default router;
