import Supplier from "../../models/Supplier.js";

const generateSupplierId = async () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  let supplierId = `SUPP${hours}${minutes}`;

  let existingSupplier = await Supplier.findOne({ supplierId });
  let attempt = 1;

  while (existingSupplier) {
    const seconds = now.getSeconds().toString().padStart(2, "0");
    supplierId = `SUPP${hours}${minutes}${seconds}${attempt}`;
    existingSupplier = await Supplier.findOne({ supplierId });
    attempt++;

    if (attempt > 10) {
      throw new Error("Unable to generate a unique supplier ID");
    }
  }

  return supplierId;
};

export async function createSupplier(req, res) {
  try {
    // Check if the email already exists
    const existingSupplier = await Supplier.findOne({ email: req.body.email });
    if (existingSupplier) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    }

    // Generate a unique supplierId
    const supplierId = await generateSupplierId();

    // Create supplier data
    const supplierData = {
      ...req.body,
      supplierId,
    };

    const supplier = new Supplier(supplierData);
    await supplier.save();

    res.status(201).json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getAllSuppliers(req, res) {
  try {
    const suppliers = await Supplier.find();
    res.json(suppliers);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getSupplierById(req, res) {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function updateSupplier(req, res) {
  try {
    const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function deleteSupplier(req, res) {
  try {
    const supplier = await Supplier.findByIdAndDelete(req.params.id);
    if (!supplier)
      return res.status(404).json({ message: "Supplier not found" });
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
