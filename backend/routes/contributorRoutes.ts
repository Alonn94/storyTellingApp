import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { postContributor } from "../controllers/contributorController";
import asyncHandler from "../utils/asyncHandler";
import { getContributors } from "../controllers/contributorController";
import { deleteContributor } from "../controllers/contributorController";

const router = express.Router();

router.post("/", authenticateToken, asyncHandler(postContributor));
router.get("/:story_id", authenticateToken, asyncHandler(getContributors));
router.delete("/:id", authenticateToken, asyncHandler(deleteContributor));




export default router;


