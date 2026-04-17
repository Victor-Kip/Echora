import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./config/db.js";
import audioRoutes from "./routes/audioRoutes.js";
import userRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
process.env.PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS middleware - must come BEFORE routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  
  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/auth", userRoutes);
app.use("/api/audio/", audioRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT, () => {
      console.log(`Server is up and running on ${process.env.PORT} ...`);
    });
  })
  .catch((err) => console.log("DB sync error:", err));
