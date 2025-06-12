import Parking from "../../models/parking.js";
import Booking from "../../models/booking.js";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import PDFDocument from "pdfkit";

import ParkingCategory from "../../models/ParkingCategory.js";

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
export async function ParkingBook(req, res) {
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

    // Validate required fields
    if (
      !fullName ||
      !licensePlate ||
      !parkingSpot ||
      !vehicleType ||
      !arrivalTime ||
      !departureTime
    ) {
      return res.status(400).json({
        success: false,
        title: "Booking Failed",
        message: "All fields are required",
        icon: "error",
      });
    }

    // Check for overlapping bookings first
    const overlappingBookings = await Booking.find({
      parkingSpot,
      status: { $ne: "cancelled" }, // Exclude cancelled bookings
      $or: [
        {
          arrivalTime: { $lt: departureTime },
          departureTime: { $gt: arrivalTime },
        },
      ],
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({
        success: false,
        title: "Booking Failed",
        message: "This time slot is already taken. Please choose another time.",
        icon: "error",
      });
    }

    const newBooking = new Booking({
      fullName,
      licensePlate,
      parkingSpot,
      vehicleType,
      arrivalTime,
      departureTime,
      netAmount,
      status: "pending", // Set default status
    });

    await newBooking.save();

    res.status(201).json({
      success: true,
      title: "Booking Successful!",
      message: `Your parking spot has been booked for ${new Date(
        arrivalTime
      ).toLocaleString()}`,
      icon: "success",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({
      success: false,
      title: "Booking Failed",
      message: "Unable to process your booking. Please try again.",
      icon: "error",
      error: error.message,
    });
  }
}

// export async function addParking(req, res) {
//   try {
//     const { parkingCategory, vehicleType, location } = req.body;
//     const newParking = new Parking({
//       parkingCategory,
//       vehicleType,
//       location,
//     });
//     await newParking.save();
//     res.status(201).json({ message: "Parking added successfully", newParking });
//   } catch (error) {
//     res.status(500).json({ message: "Error adding parking", error });
//   }
// }

// Get All Parking Entries
// export async function getAllParking(req, res) {
//   try {
//     const parkingList = await Parking.find();
//     res.status(200).json(parkingList);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching parking data", error });
//   }
// }

export async function addParkingCategory(req, res) {
  try {
    const { name, hourlyRate, totalSpots, description, securityFeatures } =
      req.body;

    const newCategory = new ParkingCategory({
      name,
      hourlyRate,
      totalSpots,
      description,
      securityFeatures,
      image: req.file ? `http://localhost:3001/${req.file.path}` : null,
    });

    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function getallcategory(req, res) {
  try {
    const categories = await ParkingCategory.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updatecategory(req, res) {
  try {
    const { name, hourlyRate, totalSpots, description, securityFeatures } =
      req.body;
    const updateData = {
      name,
      hourlyRate,
      totalSpots,
      description,
      securityFeatures,
    };

    if (req.file) {
      updateData.image = `http://localhost:3001/${req.file.path}`;
    }

    const updatedCategory = await ParkingCategory.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export async function deletecategory(req, res) {
  try {
    const category = await ParkingCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete image file if it exists
    if (category.image) {
      try {
        const imageUrl = new URL(category.image);
        const relativePath = decodeURIComponent(imageUrl.pathname);
        const absolutePath = path.join(process.cwd(), relativePath);

        // Check if file exists before attempting to delete
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
          console.log("Image deleted successfully:", absolutePath);
        }
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    // Delete the category from database
    await ParkingCategory.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Category and image deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getcategorybyid(req, res) {
  const id = req.params.id;
  try {
    const category = await ParkingCategory.findById(id);
    res.status(200).json(category);
  } catch (err) {
    console.error("Error fetching category:", err);
    res.status(500).json({ message: "Internal server error" });
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

// Get all parking bookings
export async function getAllParkingBookings(req, res) {
  try {
    const bookings = await Booking.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    if (!bookings) {
      return res.status(404).json({
        success: false,
        message: "No bookings found",
      });
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching parking bookings",
      error: error.message,
    });
  }
}

// Update booking status
export async function updateBookingStatus(req, res) {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["pending", "approved", "cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Validate bookingId format
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking ID format",
      });
    }

    // Find and update the booking
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Booking status updated successfully",
      booking,
    });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({
      success: false,
      message: "Error updating booking status",
      error: error.message,
    });
  }
}

// Get bookings by username
export async function getBookingsByUsername(req, res) {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
    }

    const bookings = await Booking.find({ fullName: username })
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Error fetching bookings by username:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching bookings",
      error: error.message,
    });
  }
}

export async function parkingReport(req, res) {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found." });
    }

    // Create a PDF document
    const doc = new PDFDocument({ margin: 30, size: "A4" });
    const filename = `Parking_Booking_Report_${Date.now()}.pdf`;

    // Set response headers to download the file
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    // Pipe the PDF to the response
    doc.pipe(res);

    // Title
    doc.fontSize(20).text("Parking Booking Report", { align: "center" });
    doc.moveDown(1);

    // Table header
    doc
      .fontSize(12)
      .fillColor("#000")
      .text("No.", { continued: true, width: 40 })
      .text("Full Name", { continued: true, width: 120 })
      .text("License Plate", { continued: true, width: 100 })
      .text("Vehicle Type", { continued: true, width: 90 })
      .text("Parking Spot", { continued: true, width: 90 })
      .text("Arrival Time", { continued: true, width: 110 })
      .text("Departure Time", { continued: true, width: 110 })
      .text("Net Amount", { width: 70 });
    doc.moveDown(0.5);

    // Draw a line under header
    doc.moveTo(doc.x, doc.y).lineTo(550, doc.y).stroke();

    // List bookings
    bookings.forEach((b, i) => {
      doc
        .fontSize(10)
        .fillColor("#333")
        .text(i + 1, { continued: true, width: 40 })
        .text(b.fullName, { continued: true, width: 120 })
        .text(b.licensePlate, { continued: true, width: 100 })
        .text(b.vehicleType, { continued: true, width: 90 })
        .text(b.parkingSpot, { continued: true, width: 90 })
        .text(new Date(b.arrivalTime).toLocaleString(), {
          continued: true,
          width: 110,
        })
        .text(new Date(b.departureTime).toLocaleString(), {
          continued: true,
          width: 110,
        })
        .text(b.netAmount ? `$${b.netAmount.toFixed(2)}` : "N/A", {
          width: 70,
        });
      doc.moveDown(0.2);
    });

    doc.end();
  } catch (error) {
    console.error("Error generating report:", error);
    res.status(500).json({ error: "Failed to generate report" });
  }
}
