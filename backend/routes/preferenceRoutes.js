import express from "express";
import {
  getUserPreferences,
  updatePreferences,
} from "../controllers/preferenceController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// Get and update preferences
router.route("/").get(getUserPreferences).put(updatePreferences);

export default router;
