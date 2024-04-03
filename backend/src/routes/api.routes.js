import express from "express";
import categoryRoutes from "./category.routes.js";
import tagRoutes from "./tag.routes.js";
import postRoutes from "./post.routes.js";
import pageRoutes from "./pages.routes.js";
import userRoutes from "./user.routes.js";
import { checkToken } from "../middlewares/middlewares.js";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/categories", checkToken, categoryRoutes);
router.use("/tags", checkToken, tagRoutes);
router.use("/posts", checkToken, postRoutes);
router.use("/pages", checkToken, pageRoutes);
// router.use("/roles", checkToken, roleRoutes);

export default router;
