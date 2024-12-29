import Order from "../models/Order.js";
import mongoose from "mongoose";
import { createNotification } from "./notificationController.js";

// Create a new order
export const createOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryMethod,
      paymentMethod,
      contactInfo,
      subtotal,
      deliveryFee,
      total,
    } = req.body;

    // Create a unique order ID
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;

    // Create new order
    const order = new Order({
      orderId,
      userId: req.user._id, // From auth middleware
      items,
      contactInfo,
      deliveryMethod,
      paymentMethod,
      subtotal,
      deliveryFee,
      total,
    });

    // Save the order
    await order.save();

    // Create notification for new order
    await createNotification(req.user._id, {
      type: "order",
      title: "Order Received",
      message: `Your order #${orderId} has been received and is being processed.`,
      metadata: { orderId: order.orderId },
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get user's orders
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { orderStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Create notification for status update
    let notificationMessage;
    switch (status) {
      case "Confirmed":
        notificationMessage =
          "Your order has been confirmed and is being prepared.";
        break;
      case "Preparing":
        notificationMessage =
          "Your order is now being prepared in our kitchen.";
        break;
      case "Ready":
        notificationMessage = "Your order is ready for pickup/delivery!";
        break;
      case "Delivered":
        notificationMessage = "Your order has been delivered. Enjoy!";
        break;
      case "Cancelled":
        notificationMessage = "Your order has been cancelled.";
        break;
      default:
        notificationMessage = `Your order status has been updated to ${status}.`;
    }

    await createNotification(order.userId, {
      type: "order",
      title: "Order Status Updated",
      message: notificationMessage,
      metadata: { orderId: order.orderId },
    });

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

// Update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { paymentStatus: status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Payment status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update payment status",
      error: error.message,
    });
  }
};

// Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow cancellation if order is in certain states
    const allowedStates = ["Processing", "Confirmed"];
    if (!allowedStates.includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled at this stage",
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    // Create notification for order cancellation
    await createNotification(req.user._id, {
      type: "order",
      title: "Order Cancelled",
      message: `Your order #${order.orderId} has been cancelled.`,
      metadata: { orderId: order.orderId },
    });

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      orderId: req.params.orderId,
      userId: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Only allow deletion of cancelled orders
    if (order.orderStatus !== "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Only cancelled orders can be deleted",
      });
    }

    await Order.deleteOne({ orderId: req.params.orderId });

    // Create notification for order deletion
    await createNotification(req.user._id, {
      type: "order",
      title: "Order Deleted",
      message: `Your order #${order.orderId} has been permanently deleted from your order history.`,
      metadata: { orderId: order.orderId },
    });

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete order",
      error: error.message,
    });
  }
};
