import Item from "../../models/Item.js";
import path from "path";
import fs from "fs";

// Get all items for a shop
export const getItems = async (req, res) => {
  try {
    const { shopId } = req.params;
    const items = await Item.find({ shopid: shopId }).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add new item
export const addItem = async (req, res) => {
  try {
    const { shopId } = req.params;
    const { name, price } = req.body;

    const imageUrl = req.file ? req.file.filename : null; // ✅ Correct usage

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newItem = new Item({
      shopid: shopId,
      name,
      price,
      imageUrl,
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update item
export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let imageUrl = item.imageUrl;

    // If a new image is uploaded, delete the old one
    if (req.file) {
      if (item.imageUrl) {
        const oldImagePath = path.resolve("uploads", item.imageUrl);
        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Old image deleted:", oldImagePath);
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }
      imageUrl = req.file.filename;
    }

    const updatedItem = await Item.findByIdAndUpdate(
      id,
      { name, price, imageUrl },
      { new: true }
    );

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete item
export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Delete image from uploads folder
    if (item.imageUrl) {
      const imagePath = path.resolve("uploads", item.imageUrl);
      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
          console.log("Image deleted:", imagePath);
        }
      } catch (err) {
        console.error("Error deleting image:", err);
      }
    }

    await Item.findByIdAndDelete(id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single item
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
