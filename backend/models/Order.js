import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  _id: String,
  name: String,
  price: Number,
  quantity: Number,
  notes: String,
});

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    contactInfo: {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: String,
    },
    deliveryMethod: {
      type: String,
      enum: ["delivery", "pickup"],
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "telebirr", "cbebirr", "chapa"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "Processing",
        "Confirmed",
        "Preparing",
        "Ready",
        "Delivered",
        "Completed",
        "Cancelled",
      ],
      default: "Processing",
    },
    subtotal: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
