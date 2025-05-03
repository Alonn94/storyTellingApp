import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import storyRoutes from "./routes/storyRoutes";
import contributorRoutes from "./routes/contributorRoutes";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001; // 5001 is fallback for local dev
app.use(cors()); // Temporarily allow everything
app.use (express.json());
app.use (cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/contributors", contributorRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



app.get("/ping", (req, res) => {
    res.send("pong");
  });


