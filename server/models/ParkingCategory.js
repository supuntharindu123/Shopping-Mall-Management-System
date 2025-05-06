import mongoose from "mongoose";

const ParkingCategorySchema = new mongoose.Schema({
  categoryname: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  security: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
});

const ParkingCategory = mongoose.model(
  "ParkingCategory",
  ParkingCategorySchema
);
export default ParkingCategory;
