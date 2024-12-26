import mongoose from "mongoose";

const preferenceSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
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

const Preference =
  mongoose.models.Preference || mongoose.model("Preference", preferenceSchema);
export default Preference;
