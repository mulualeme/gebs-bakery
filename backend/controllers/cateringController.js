import Catering from "../models/cateringModel.js";

// Create new catering inquiry
export const createCateringInquiry = async (req, res) => {
  try {
    const inquiry = await Catering.create(req.body);
    res.status(201).json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all catering inquiries (admin only)
export const getCateringInquiries = async (req, res) => {
  try {
    const inquiries = await Catering.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get single catering inquiry
export const getCateringInquiry = async (req, res) => {
  try {
    const inquiry = await Catering.findById(req.params.id);
    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }
    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update catering inquiry status (admin only)
export const updateCateringStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inquiry = await Catering.findById(req.params.id);

    if (!inquiry) {
      return res.status(404).json({ message: "Inquiry not found" });
    }

    inquiry.status = status;
    await inquiry.save();

    res.json(inquiry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
