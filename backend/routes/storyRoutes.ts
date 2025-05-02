// routes/storyRoutes.ts

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAuthor } from "../middleware/authMiddleware";
import { deleteStory } from "../controllers/storyController";
import { postStory } from "../controllers/storyController";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.delete("/:storyId", authenticateToken, authorizeAuthor, deleteStory);
router.post("/", authenticateToken, asyncHandler(postStory));

export default router;