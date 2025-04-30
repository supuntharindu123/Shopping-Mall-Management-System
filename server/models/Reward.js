import mongoose from "mongoose";
const RewardSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Free Meal"
  pointsRequired: { type: Number, required: true },
  category: { type: String, required: true }, // e.g., "Food", "Fashion"
});

const Reward = mongoose.model("Reward", RewardSchema);
export default Reward;
