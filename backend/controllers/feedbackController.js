import Feedback from "../models/feedbackModel.js";

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const { rating, category, subject, message } = req.body;

    const feedback = await Feedback.create({
      userId: req.user._id,
      userEmail: req.user.email,
      rating,
      category,
      subject,
      message,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all feedback for a user
export const getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single feedback
export const getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Check if the feedback belongs to the user
    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Check if the feedback belongs to the user
    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Only allow updating message and subject
    feedback.message = req.body.message || feedback.message;
    feedback.subject = req.body.subject || feedback.subject;

    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    // Check if the feedback belongs to the user
    if (feedback.userId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await feedback.remove();
    res.json({ message: "Feedback removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
