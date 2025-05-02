import express from "express";
import asyncHandler from "../utils/asyncHandler";
import { login, register } from "../controllers/authController";

const router = express.Router();


router.post("/register", asyncHandler(register));
router.post("/login", asyncHandler(login));

export default router;

