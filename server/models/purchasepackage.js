import mongoose from "mongoose";
const PurchasepackageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MembershipPackage",
    required: true,
  },
  packagename: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const purchasepackage = mongoose.model(
  "PurchasePackage",
  PurchasepackageSchema
);
export default purchasepackage;
