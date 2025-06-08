
import Parking from "../models/parking.js";

// Create Parking Entry
export async function CreateParking  (req, res) {
  try {
    const { parkingCategory, vehicleType, location } = req.body;
    const newParking = new Parking({ parkingCategory, vehicleType, location });
    await newParking.save();
    res.status(200).json({ message: "Parking added successfully", newParking });
  } catch (error) {
    res.status(500).json({ message: "Error adding parking", er:error });
  }
};

// Get All Parking Entries
export async function getAllParking( req, res)  {
  try {
    const parkingList = await Parking.find();
    res.status(200).json(parkingList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parking data", error });
  }
};

// // Get Single Parking Entry
// exports.getParkingById = async (req, res) => {
//   try {
//     const parking = await Parking.findById(req.params.id);
//     if (!parking) return res.status(404).json({ message: "Parking not found" });
//     res.status(200).json(parking);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching parking details", error });
//   }
// };

// // Update Parking Entry
// exports.updateParking = async (req, res) => {
//   try {
//     const { parkingCategory, vehicleType, location } = req.body;
//     const updatedParking = await Parking.findByIdAndUpdate(
//       req.params.id,
//       { parkingCategory, vehicleType, location },
//       { new: true }
//     );
//     if (!updatedParking)
//       return res.status(404).json({ message: "Parking not found" });

//     res.status(200).json({ message: "Parking updated successfully", updatedParking });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating parking", error });
//   }
// };

// // Delete Parking Entry
export async function deleteParking(req, res) {
  try {
    const deletedParking = await Parking.findByIdAndDelete(req.params.id);
    if (!deletedParking)
      return res.status(404).json({ message: "Parking not found" });

    res.status(200).json({ message: "Parking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting parking", error });
  }
};

