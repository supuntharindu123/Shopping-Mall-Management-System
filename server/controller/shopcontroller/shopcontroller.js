import Shop from "../../models/Shop.js";

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

    // Parse operatingDays if it's sent as a string
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
    const shops = await Shop.find().sort({ createdAt: -1 }); // Sort by newest first
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
      return res.status(404).json({
        message: "Shop not found",
      });
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
