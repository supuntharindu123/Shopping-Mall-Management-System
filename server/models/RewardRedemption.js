import mongoose from "mongoose";

const rewardRedemptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  username: {
    type: String,
    required: true,
  },
  rewardDetails: {
    rewardId: mongoose.Schema.Types.ObjectId,
    rewardName: String,
    pointsRequired: Number,
    benefits: [String],
    category: String,
  },
  shopDetails: {
    shopId: mongoose.Schema.Types.ObjectId,
    shopName: String,
    category: String,
  },
  redeemedAt: {
    type: Date,
    default: Date.now,
  },
});

const RewardsRedemption = mongoose.model(
  "RewardRedemption",
  rewardRedemptionSchema
);
export default RewardsRedemption;
