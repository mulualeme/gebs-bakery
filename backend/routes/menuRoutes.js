import express from "express";
import {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// Get all menu items
router.get("/", getAllMenuItems);

// Get a single menu item
router.get("/:id", getMenuItem);

// Create a new menu item
router.post("/", createMenuItem);

// Update a menu item
router.put("/:id", updateMenuItem);

// Delete a menu item
router.delete("/:id", deleteMenuItem);

export default router;
