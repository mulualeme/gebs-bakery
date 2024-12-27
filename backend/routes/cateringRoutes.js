import express from "express";
import {
  createCateringInquiry,
  getCateringInquiries,
  getCateringInquiry,
  updateCateringStatus,
} from "../controllers/cateringController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/inquire", createCateringInquiry);

// Protected routes (admin only)
router.use(protect);
router.get("/", getCateringInquiries);
router.get("/:id", getCateringInquiry);
router.put("/:id/status", updateCateringStatus);

export default router;
