// backend/controllers/storyController.ts
import { Request, Response } from "express";
import {createStory} from "../models/storyModel";
import { getAllStories as getStoriesFromDb } from "../models/storyModel";
import { updateStory as updateStoryInDb } from "../models/storyModel";

export const deleteStory = async (req: Request, res: Response): Promise<void> => {
    try {
        const { storyId } = req.params;
        // Logic to delete the story
        res.status(200).json({ message: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete story" });
    }
};


export const postStory = async (req: Request, res: Response) => {
    const {title, content} = req.body;
    const userId = (req.user as any)?.userId;

    if (!title || !content) {
        return res.status(400).json({message: "Title and content are requiered"});
    };

    try {
        const story = await createStory(title, content, userId);
        res.status(201).json({story});
    } catch (err) {
        console.error("Error creating story:", err);
        res.status(500).json({message:"Server error while creating"});
    }
};


export const getAllStories = async (req: Request, res: Response) => {
    try {
        const stories = await getStoriesFromDb();
        res.status(200).json({stories});
    } catch (error) {
        console.error("Error fetching stories:", error);
        res.status(500).json({message: "Server error while fetching stories"});
    }
};

export const updateStory = async (req: Request, res: Response) => {
    const {title, content} = req.body;
    const {storyId} = req.params;

    if (!title || !content) {
        return res.status(400).json({message: "Title and content are required"});
    }
    try {
        const updated= await updateStoryInDb(parseInt(storyId), title, content);

        if (!updated) {
            return res.status(404).json({message: "Story not found"});
        }
        res. status(200).json({story: updated});
    } catch (error) {
        console.error ("Error updating story:", error);
        res. status(500).json({message: "Server error while updating story"});
    }
};

