import { Request, Response } from "express";
import { addContributor } from "../models/contributorModel";

export const postContributor = async (req: Request, res: Response) => {
  const { story_id, user_id } = req.body;
  const currentUserId = (req.user as any)?.userId;

  if (!story_id || !user_id) {
    return res.status(400).json({ message: "story_id and user_id are required." });
  }

  // Optional: add logic to verify currentUserId is the author of story_id

  try {
    const contributor = await addContributor(story_id, user_id);
    res.status(201).json({ contributor });
  } catch (error:any) {
    console.error("Error adding contributor:", error.message || error);
    res.status(500).json({ message: "Failed to add contributor." });
  }
};