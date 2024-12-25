import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import MenuItem from "../models/MenuItem.js";
import { menuItems } from "../data/seedData.js";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from backend/.env
dotenv.config({ path: join(__dirname, "../.env") });

// Verify the URI is loaded
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not defined in environment variables");
  process.exit(1);
}

console.log(
  "Attempting to connect to MongoDB with URI:",
  uri.replace(/\/\/([^:]+):([^@]+)@/, "//***:***@")
);

mongoose
  .connect(uri, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    dbName: "gebsBakery",
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Clear existing menu items
    await MenuItem.deleteMany({});

    // Insert new menu items
    await MenuItem.insertMany(menuItems);

    console.log("Menu items seeded successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error seeding menu items:", error);
    console.error(error.stack);
    process.exit(1);
  });
