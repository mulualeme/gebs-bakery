import mongoose from "mongoose";

const cateringSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    eventType: {
      type: String,
      required: [true, "Please specify the event type"],
    },
    eventDate: {
      type: Date,
      required: [true, "Please specify the event date"],
    },
    guestCount: {
      type: Number,
      required: [true, "Please specify the number of guests"],
    },
    location: {
      type: String,
      required: [true, "Please provide the event location"],
    },
    message: {
      type: String,
      required: [true, "Please provide additional details"],
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    preferences: {
      dietary: [String],
      allergies: [String],
      specialRequests: String,
    },
    budget: {
      type: String,
      required: [true, "Please specify your budget range"],
    },
  },
  {
    timestamps: true,
  }
);

const Catering =
  mongoose.models.Catering || mongoose.model("Catering", cateringSchema);
export default Catering;
