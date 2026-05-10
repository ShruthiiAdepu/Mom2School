import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Import routes
import authRoutes from "./routes/auth.js";
import parentProfileRoutes from "./routes/parentProfile.js";
import riderProfileRoutes from "./routes/riderProfile.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ===== Middleware =====
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// ===== Routes =====
app.use("/api/auth", authRoutes);
app.use("/api/parent", parentProfileRoutes);
app.use("/api/rider", riderProfileRoutes);

// ===== Test Route =====
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// ===== Connect to MongoDB and Start Server =====
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection failed:", err));
