import mongoose from "mongoose";

const parkingCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  hourlyRate: { type: Number, required: true },
  totalSpots: { type: Number, required: true },
  description: { type: String },
  securityFeatures: { type: String },
  image: { type: String }, // stores file path
});

const ParkingCategory = mongoose.model(
  "ParkingCategory",
  parkingCategorySchema
);
export default ParkingCategory; // Export the schema for use in other files
