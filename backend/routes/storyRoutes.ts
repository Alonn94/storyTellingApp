// routes/storyRoutes.ts

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAuthor } from "../middleware/authMiddleware";
import { deleteStory } from "../controllers/storyContoller";

const router = express.Router();

router.delete("/:storyId", authenticateToken, authorizeAuthor, deleteStory);

export default router;