import {Request, Response, NextFunction } from "express";
import brcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/userModel";



const saltRounds=10;

export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({message: "Please fill in all fields"});
    }

    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({message:"User already exists"});
        }

        const hashedPassword = await brcrypt.hash(password, saltRounds);
        const newUser = await createUser(username, email, hashedPassword);

        res.status(201).json({user:newUser});
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({message: "Something went wrong"});
    }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json ({message: "Please fill in all fields"});
    };
    try {
        const user = await findUserByEmail(email);
        if(!user) return res.status(401).json({message: "Invalid credentials"});
        const isMatch = await brcrypt.compare(password, user.password_hash);
        if (!isMatch) return res.status(401).json({message: "Invalid credentials"});

        const accessToken = jwt.sign({userId: user.id}, process.env.JWT_SECRET!, {
            expiresIn:"15m",
        });
        const refreshToken = jwt.sign({userId: user.id}, process.env.REFRESH_SECRET!,{
            expiresIn:"7d",
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.json({accessToken});
        
    } catch (error) {
        console.error ("Login error:", error);
        res.status(500).json({message: "Something went wrong"});
    }
};



