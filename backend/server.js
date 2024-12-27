import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 50000,
    socketTimeoutMS: 45000,
    dbName: "gebsBakery",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB connection error:", error));

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "https://gebs-bakery.vercel.app/"
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/preferences", preferenceRoutes);

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gebs Bakery API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
