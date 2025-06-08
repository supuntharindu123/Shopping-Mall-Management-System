// backend/models/Analytics.js
import mongoose from "mongoose";

const AnalyticsSchema = new mongoose.Schema({
  totalMembers: { type: Number, required: true },
  totalSpending: { type: Number, required: true },
  categorySpending: {
    food: { type: Number, default: 0 },
    fashion: { type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    lifestyle: { type: Number, default: 0 },
  },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analytics", AnalyticsSchema);
