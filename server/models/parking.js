
import mongoose from "mongoose";

const ParkingSchema = new mongoose.Schema({
  parkingCategory: {
    type: String,
    enum: ["Basement Parking", "1st Floor Parking", "Backyard Parking"],
    required: true,
  },
  vehicleType: {
    type: String,
    enum: ["Car", "Truck", "Motorcycle", "SUV"],
    required: true,
  },
  location: {
    type: Number,
    required: true,
  }, //example 001,002,003
});

const Parking = mongoose.model("Parking", ParkingSchema);
export default Parking;

