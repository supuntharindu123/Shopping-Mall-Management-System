import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true,
  },
  manufacturedDate: {
    type: Date,
  },
  expiryDate: {
    type: Date,
  },
  salesCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add index for productId to ensure uniqueness
productSchema.index({ productId: 1 }, { unique: true });

const Product = mongoose.model("Product", productSchema);
export default Product;
