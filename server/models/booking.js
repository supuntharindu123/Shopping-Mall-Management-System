import mongoose from "mongoose";

const ParkingSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    licensePlate: { type: String, required: true },
    parkingSpot: {
      type: String,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["Car", "Truck", "Motorcycle", "SUV"],
    },
    arrivalTime: { type: Date, required: true },
    departureTime: { type: Date, required: true },
    netAmount: { type: Number, required: false },
    status: {
      type: String,
      required: true,
      enum: ["pending", "approved", "cancelled"],
    },
    location: { type: String, required: false },
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", ParkingSchema);
export default Booking;
