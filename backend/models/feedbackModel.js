import mongoose from "mongoose";

const feedbackSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "general",
        "product",
        "service",
        "delivery",
        "website",
        "suggestion",
      ],
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "reviewed", "resolved"],
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating it
const Feedback =
  mongoose.models.Feedback || mongoose.model("Feedback", feedbackSchema);
export default Feedback;
