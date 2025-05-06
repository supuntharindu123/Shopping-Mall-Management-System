import Parking from "../../models/parking.js";
import Booking from "../../models/booking.js";

// Add new function to check availability
export async function checkAvailability(req, res) {
  try {
    const { parkingSpot, arrivalTime, departureTime } = req.body;

    // Check for overlapping bookings
    const overlappingBookings = await Booking.find({
      parkingSpot,
      $or: [
        {
          // New booking starts during existing booking
          arrivalTime: { $lt: departureTime },
          departureTime: { $gt: arrivalTime },
        },
        {
          // Existing booking starts during new booking
          arrivalTime: { $lt: departureTime },
          departureTime: { $gt: arrivalTime },
        },
      ],
    });

    const isAvailable = overlappingBookings.length === 0;

    res.status(200).json({
      isAvailable,
      title: isAvailable ? "Spot Available!" : "Spot Unavailable",
      message: isAvailable
        ? `Parking spot is available for your selected time`
        : `This time slot is already booked. Please select another time`,
      icon: isAvailable ? "success" : "warning",
    });
  } catch (error) {
    res.status(500).json({
      isAvailable: false,
      title: "Error",
      message: "Unable to check availability. Please try again.",
      icon: "error",
      error: error.message,
    });
  }
}

// Modify CreateParking to check availability first
export async function CreateParking(req, res) {
  try {
    const {
      fullName,
      licensePlate,
      parkingSpot,
      vehicleType,
      arrivalTime,
      departureTime,
      netAmount,
    } = req.body;

    // Check for overlapping bookings first
    const overlappingBookings = await Parking.find({
      parkingSpot,
      $or: [
        {
          arrivalTime: { $lt: departureTime },
          departureTime: { $gt: arrivalTime },
        },
        {
          arrivalTime: { $lt: departureTime },
          departureTime: { $gt: arrivalTime },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({
        title: "Booking Failed",
        message: "This time slot is already taken. Please choose another time.",
        icon: "error",
      });
    }

    const newParking = new Parking({
      fullName,
      licensePlate,
      parkingSpot,
      vehicleType,
      arrivalTime,
      departureTime,
      netAmount,
      status: "active",
    });

    await newParking.save();
    res.status(200).json({
      success: true,
      title: "Booking Successful!",
      message: `Your parking spot has been booked for ${new Date(
        arrivalTime
      ).toLocaleString()}`,
      icon: "success",
      booking: newParking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      title: "Booking Failed",
      message: "Unable to process your booking. Please try again.",
      icon: "error",
      error: error.message,
    });
  }
}

export async function addParking(req, res) {
  try {
    const { parkingCategory, vehicleType, location } = req.body;
    const newParking = new Parking({
      parkingCategory,
      vehicleType,
      location,
    });
    await newParking.save();
    res.status(201).json({ message: "Parking added successfully", newParking });
  } catch (error) {
    res.status(500).json({ message: "Error adding parking", error });
  }
}

// Get All Parking Entries
export async function getAllParking(req, res) {
  try {
    const parkingList = await Parking.find();
    res.status(200).json(parkingList);
  } catch (error) {
    res.status(500).json({ message: "Error fetching parking data", error });
  }
}

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
}
