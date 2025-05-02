// routes/storyRoutes.ts

import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { authorizeAuthor } from "../middleware/authMiddleware";
import { postStory,getAllStories, deleteStory } from "../controllers/storyController";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.delete("/:storyId", authenticateToken, authorizeAuthor, deleteStory);
router.post("/", authenticateToken, asyncHandler(postStory));
router.get("/", authenticateToken, asyncHandler(getAllStories));

export default router;