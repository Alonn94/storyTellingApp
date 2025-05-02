// backend/middleware/authorize.ts
import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}
import pool from "../db";

export const authorizeAuthor = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Authorization logic
        next(); // Call next() to pass control to the next middleware
    } catch (error) {
        res.status(403).json({ error: "Forbidden" });
    }
};
// backend/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  user?: any; // You can later type this more strictly
}
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    try {
        // Token validation logic
        next(); // Call next() to pass control to the next middleware
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};
