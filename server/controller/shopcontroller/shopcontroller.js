import Shop from "../../models/Shop.js";
import Transaction from "../../models/Transaction.js";
import Item from "../../models/Item.js";
import path from "path";
import PDFDocument from "pdfkit";
import fs from "fs";

export async function Addshops(req, res) {
  try {
    const {
      shopName,
      shopNumber,
      category,
      floor,
      status,
      description,
      openTime,
      closeTime,
      operatingDays,
    } = req.body;

    const imageFileName = req.file ? req.file.filename : null;

    const parsedOperatingDays =
      typeof operatingDays === "string"
        ? JSON.parse(operatingDays)
        : operatingDays;

    const newShop = new Shop({
      shopName,
      shopNumber,
      category,
      floor,
      status,
      description,
      imageFileName,
      openTime,
      closeTime,
      operatingDays: parsedOperatingDays,
    });

    await newShop.save();
    res.status(200).json({
      message: "Shop added successfully.",
      shop: newShop,
    });
  } catch (error) {
    console.error("Error adding shop:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function GetShops(req, res) {
  try {
    const shops = await Shop.find().sort({ createdAt: -1 });
    res.json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function GetShopById(req, res) {
  try {
    const { id } = req.params;
    const shop = await Shop.findById(id);

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function UpdateShop(req, res) {
  try {
    const { id } = req.params;
    const {
      shopName,
      shopNumber,
      category,
      floor,
      status,
      description,
      openTime,
      closeTime,
      operatingDays,
    } = req.body;

    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const parsedOperatingDays =
      typeof operatingDays === "string"
        ? JSON.parse(operatingDays)
        : operatingDays;

    let imageFileName = shop.imageFileName;
    if (req.file) {
      // Delete old image
      if (shop.imageFileName) {
        const oldImagePath = path.resolve("uploads", shop.imageFileName);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Old image deleted successfully:", oldImagePath);
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
      imageFileName = req.file.filename;
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      id,
      {
        shopName,
        shopNumber,
        category,
        floor,
        status,
        description,
        imageFileName,
        openTime,
        closeTime,
        operatingDays: parsedOperatingDays,
      },
      { new: true }
    );

    res.json({
      message: "Shop updated successfully",
      shop: updatedShop,
    });
  } catch (error) {
    console.error("Error updating shop:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function DeleteShop(req, res) {
  try {
    const { id } = req.params;

    const shop = await Shop.findById(id);
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    // Delete shop image if it exists
    if (shop.imageFileName) {
      const imagePath = path.resolve("uploads", shop.imageFileName);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Image deleted successfully:", imagePath);
        }
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    // Delete all items linked to the shop
    await Item.deleteMany({ shopid: id });

    // Delete all transactions linked to the shop
    await Transaction.deleteMany({ shopId: id });

    // Delete the shop itself
    await Shop.findByIdAndDelete(id);

    res.json({
      message: "Shop, its items, and transactions deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

export async function transactionreport(req, res) {
  try {
    const { shopId } = req.params;

    const orders = await Transaction.find({ shopId });

    if (!orders.length) {
      return res.status(404).json({ error: "No orders found for this shop." });
    }

    const doc = new PDFDocument();
    const filename = `Order_Report_Shop_${shopId}_${Date.now()}.pdf`;

    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    doc
      .fontSize(20)
      .text(`Order Report - Shop ID: ${shopId}`, { align: "center" });
    doc.moveDown();

    orders.forEach((order, i) => {
      doc.fontSize(14).text(`${i + 1}. Shop: ${order.shopName}`);
      doc
        .fontSize(12)
        .text(`Order Date: ${new Date(order.createdAt).toLocaleString()}`);
      doc.text(`Total Amount: $${order.totalAmount}`);
      doc.text(`Applied Discount: $${order.appliedDiscount}`);
      doc.text(`Points Earned: ${order.pointsEarned}`);
      doc.text(`Final Total: $${order.finalTotal}`);
      if (order.discountAddedPackage)
        doc.text(`Discount Package: ${order.discountAddedPackage}`);

      doc.text("Items:");
      order.items.forEach((item) => {
        doc.text(` - ${item.itemName}: ${item.quantity} x $${item.price}`);
      });

      doc.moveDown();
    });

    doc.end();
  } catch (err) {
    console.error("Error generating PDF report:", err);
    res.status(500).json({ error: "Failed to generate order report" });
  }
}
