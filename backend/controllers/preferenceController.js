import Preference from "../models/preferenceModel.js";
import User from "../models/userModel.js";

// Get user preferences
export const getUserPreferences = async (req, res) => {
  try {
    let preferences = await Preference.findOne({ user: req.user._id });

    if (!preferences) {
      // Create default preferences if none exist
      preferences = await Preference.create({
        user: req.user._id,
      });
    }

    res.json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user preferences
export const updatePreferences = async (req, res) => {
  try {
    const {
      phone,
      address,
      dietaryPreferences,
      allergyInformation,
      marketingPreferences,
    } = req.body;

    let preferences = await Preference.findOne({ user: req.user._id });

    if (!preferences) {
      preferences = await Preference.create({
        user: req.user._id,
        phone,
        address,
        dietaryPreferences,
        allergyInformation,
        marketingPreferences,
      });
    } else {
      preferences.phone = phone;
      preferences.address = address;
      preferences.dietaryPreferences = dietaryPreferences;
      preferences.allergyInformation = allergyInformation;
      preferences.marketingPreferences = marketingPreferences;
      await preferences.save();
    }

    // Update user's basic info
    await User.findByIdAndUpdate(req.user._id, {
      phone,
      address,
    });

    res.json(preferences);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
