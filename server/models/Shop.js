import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    shopName: String,
    shopNumber: String,
    category: String,
    floor: String,
    status: { type: String, default: "available" },
    description: String,
    imageFileName: String, // filename only
    openTime: String,
    closeTime: String,
    operatingDays: {
      monday: { type: Boolean, default: true },
      tuesday: { type: Boolean, default: true },
      wednesday: { type: Boolean, default: true },
      thursday: { type: Boolean, default: true },
      friday: { type: Boolean, default: true },
      saturday: { type: Boolean, default: true },
      sunday: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const Shop = mongoose.model("shop", shopSchema);
export default Shop;
