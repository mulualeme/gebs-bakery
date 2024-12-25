import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["Bread", "Cake", "Donut", "Pastry", "Sandwich", "Tart"],
  },
  image: {
    type: String,
    required: true,
  },
  categoryColor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: String,
    required: true,
  }],
}, {
  timestamps: true
});

export default mongoose.model("MenuItem", menuItemSchema); 