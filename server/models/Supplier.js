import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  supplierId: {
    type: String,
    unique: true,
    required: true,
  },
});

const Supplier = mongoose.model("Supplier", supplierSchema);
export default Supplier;
