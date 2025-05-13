import mongoose from "mongoose";

const MembershipPackageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  monthlyCost: { type: Number, required: true },
  benefits: [{ type: String }],
  pointsPerDollar: { type: Number, required: true },
  description: { type: String },
  category: { type: String, required: true },
  discount: { type: Number, require: false },
});

const Package = mongoose.model("MembershipPackage", MembershipPackageSchema);
export default Package;
