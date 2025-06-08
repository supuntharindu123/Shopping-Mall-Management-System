import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pointsRequired: {
    type: Number,
    required: true,
    min: 0,
  },
  benefits: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],

  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reward = mongoose.model("Reward", RewardSchema);
export default Reward;
