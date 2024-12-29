import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import preferenceRoutes from "./routes/preferenceRoutes.js";
import cateringRoutes from "./routes/cateringRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Store connected users
export const connectedUsers = new Map();

// Socket.io middleware for authentication
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
});

// Socket.io connection handling
io.on("connection", (socket) => {
  const userId = socket.userId;
  connectedUsers.set(userId, socket.id);

  socket.on("disconnect", () => {
    connectedUsers.delete(userId);
  });
});

// Export io instance to be used in other files
export const socketIO = io;

const port = process.env.PORT || 5000;

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
    exposedHeaders: ["Content-Range", "X-Content-Range"],
    maxAge: 86400,
  })
);
app.use(express.json());

// Serve static files
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/preferences", preferenceRoutes);
app.use("/api/catering", cateringRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/notifications", notificationRoutes);

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
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
