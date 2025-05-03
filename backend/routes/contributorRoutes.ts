import express from "express";
import { authenticateToken } from "../middleware/authMiddleware";
import { postContributor } from "../controllers/contributorController";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.post("/", authenticateToken, asyncHandler(postContributor));

export default router;

