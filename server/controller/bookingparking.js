
import Booking from '../models/booking.js'

// Add a new parking record
export async function Bookingparking(req, res){
  try {
    const { fullName, licensePlate, parkingSpot, vehicleType, arrivalTime, departureTime } = req.body;

    // Calculate price
    const rates = { "Basement Parking": 2.0, "1st Floor Parking": 1.5, "Backyard Parking": 0.0 };
    const arrival = new Date(arrivalTime);
    const departure = new Date(departureTime);
    const duration = (departure - arrival) / (1000 * 60 * 60); // Convert ms to hours
    const netAmount = duration * (rates[parkingSpot] || 0);

    const newParking = new Booking({
      fullName,
      licensePlate,
      parkingSpot,
      vehicleType,
      arrivalTime,
      departureTime,
      netAmount,
    });

    await newParking.save();
    res.status(201).json({ message: "Parking reserved successfully!", parking: newParking });
  } catch (error) {
    res.status(500).json({ error: "Failed to add parking" });
  }
};

// Get all parking records
// exports.getAllParking = async (req, res) => {
//   try {
//     const parkings = await Parking.find().sort({ createdAt: -1 });
//     res.status(200).json(parkings);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch parking records" });
//   }
// };

// // Get a single parking record by ID
// exports.getParkingById = async (req, res) => {
//   try {
//     const parking = await Parking.findById(req.params.id);
//     if (!parking) return res.status(404).json({ error: "Parking record not found" });
//     res.status(200).json(parking);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch parking record" });
//   }
// };

// // Update parking record
// exports.updateParking = async (req, res) => {
//   try {
//     const updatedParking = await Parking.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedParking) return res.status(404).json({ error: "Parking record not found" });
//     res.status(200).json({ message: "Parking updated successfully!", parking: updatedParking });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to update parking record" });
//   }
// };

// // Delete parking record
// exports.deleteParking = async (req, res) => {
//   try {
//     const deletedParking = await Parking.findByIdAndDelete(req.params.id);
//     if (!deletedParking) return res.status(404).json({ error: "Parking record not found" });
//     res.status(200).json({ message: "Parking deleted successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to delete parking record" });
//   }
// };

