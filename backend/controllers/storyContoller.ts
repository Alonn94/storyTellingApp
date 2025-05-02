// backend/controllers/storyController.ts
import { Request, Response } from "express";

export const deleteStory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { storyId } = req.params;
        // Logic to delete the story
        res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete story" });
    }
};