import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const router = express.Router();

// Protected routes (require authentication)
router.use(protect);

// Create new order
router.post("/", createOrder);

// Get user's orders
router.get("/my-orders", getUserOrders);

// Get single order
router.get("/:orderId", getOrder);

// Update order status
router.patch("/:orderId/status", updateOrderStatus);

// Update payment status
router.patch("/:orderId/payment", updatePaymentStatus);

// Cancel order
router.post("/:orderId/cancel", cancelOrder);

// Delete order
router.delete("/:orderId", deleteOrder);

export default router;
