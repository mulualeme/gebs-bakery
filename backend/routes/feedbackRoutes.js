import express from "express";
import {
  createFeedback,
  getUserFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes are protected
router.use(protect);

// Create and get all feedback
router.route("/").post(createFeedback).get(getUserFeedback);

// Get, update and delete specific feedback
router
  .route("/:id")
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deleteFeedback);

export default router;
