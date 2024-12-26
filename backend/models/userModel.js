import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    dietaryPreferences: {
      type: [String],
      default: [],
    },
    allergyInformation: {
      type: [String],
      default: [],
    },
    marketingPreferences: {
      emailNotifications: {
        type: Boolean,
        default: false,
      },
      smsNotifications: {
        type: Boolean,
        default: false,
      },
      specialOffers: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model exists before creating it
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
