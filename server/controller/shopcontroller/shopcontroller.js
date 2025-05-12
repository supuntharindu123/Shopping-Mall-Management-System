import Shop from "../../models/Shop.js";
import path from "path";
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

    await Shop.findByIdAndDelete(id);

    res.json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}
