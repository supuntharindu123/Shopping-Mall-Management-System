import { Router } from "express";
import multer from "multer";
import path from "path";
import {
  GetUserDetails,
  LoginUser,
  RegisterUser,
} from "./controller/usercontroller/usercontroller.js";
import {
  addMembershipPackage,
  addReward,
  Goals,
  Purchasing,
  Reccommend,
  Rewards,
  purchasepackages,
  transactionsdetails,
  pkgDetails,
  removeTransaction,
  getUserMembershipPackage,
  updatePackage,
  removepkg,
} from "./controller/membershipcontroller/membership.js";
import {
  addParking,
  addParkingCategory,
  checkAvailability,
  CreateParking,
  deletecategory,
  deleteParking,
  getallcategory,
  getAllParking,
  updatecategory,
} from "./controller/parkingcontroller/parkingcontroller.js";
import { Bookingparking } from "./controller/parkingcontroller/bookingparking.js";
import SellingHistory from "./models/SellingHistory.js";
import {
  createSellingHistory,
  getAllSellingHistory,
} from "./controller/storecontroller/sellingHistoryController.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getMostSellingProducts,
  getProductById,
  updateProduct,
} from "./controller/storecontroller/storeController.js";
import {
  createSupplier,
  deleteSupplier,
  getAllSuppliers,
  getSupplierById,
  updateSupplier,
} from "./controller/storecontroller/supplierController.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/purchase", Purchasing);
router.post("/rewards", Rewards);
router.post("/addpkg", addMembershipPackage);
router.get("/goal/:userId", Goals);
router.get("/recommend/:userId", Reccommend);
router.post("/addrewards", addReward);
router.post("/purchasepackage", purchasepackages);
router.get("/transactions", transactionsdetails);
router.get("/details/:username", GetUserDetails);
router.get("/pkgdetails/:id", pkgDetails);
router.delete("/removetransaction/:transactionId", removeTransaction);
router.get("/packages", getUserMembershipPackage);
router.put("/packages/:id", updatePackage);
router.delete("/packages/:id", removepkg);

//parking
router.post("/parking", CreateParking);
router.get("/parkings", getAllParking);
router.delete("/parkings/:id", deleteParking);
router.post("/booking", Bookingparking);
router.get("/check-availability", checkAvailability);
router.post("/addparking", addParking);
router.post("/parkingcategory", upload.single("image"), addParkingCategory);
router.get("/parkingcategory", getallcategory);
router.put("/parkingcategory/:id", upload.single("image"), updatecategory);
router.delete("/parkingcategory/:id", deletecategory);

//store
router.post("/add-selling-history", createSellingHistory);
router.get("/get-all-selling-history", getAllSellingHistory);
router.post("/create_product", createProduct);
router.put("/update_product/:id", updateProduct);
router.get("/products/most-selling", getMostSellingProducts);
router.get("/get_all_products", getAllProducts);
router.get("/get_product/:id", getProductById);
router.delete("/delete_product/:id", deleteProduct);

// Supplier Routes
router.post("/create_supplier", createSupplier);
router.get("/get_all_suppliers", getAllSuppliers);
router.get("/get_supplier/:id", getSupplierById);
router.put("/update_supplier/:id", updateSupplier);
router.delete("/delete_supplier/:id", deleteSupplier);

export default router;
