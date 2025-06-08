import mongoose from "mongoose";

// Define the SellingHistory schema
const sellingHistorySchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the SellingHistory model using the schema
const SellingHistory = mongoose.model("SellingHistory", sellingHistorySchema);

export default SellingHistory;
