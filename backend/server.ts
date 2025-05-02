import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import storyRoutes from "./routes/storyRoutes";

dotenv.config();
const app = express();
const PORT = 5001;
app.use(cors()); // Temporarily allow everything
app.use (express.json());
app.use (cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


// After auth routes
app.use("/api/stories", storyRoutes);

app.get("/ping", (req, res) => {
    res.send("pong");
  });