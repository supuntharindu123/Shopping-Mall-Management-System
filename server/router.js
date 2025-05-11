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
  getAllPackages,
} from "./controller/membershipcontroller/membership.js";
import {
  addParkingCategory,
  checkAvailability,
  deletecategory,
  getallcategory,
  getcategorybyid,
  ParkingBook,
  updatecategory,
} from "./controller/parkingcontroller/parkingcontroller.js";
import {
  Addshops,
  GetShopById,
  GetShops,
} from "./controller/shopcontroller/shopcontroller.js";

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
router.get("/pkg", getAllPackages);

//parking
// router.post("/parking", CreateParking);
// router.get("/parkings", getAllParking);
// router.delete("/parkings/:id", deleteParking);
router.post("/booking", ParkingBook);
router.get("/check-availability", checkAvailability);
// router.post("/addparking", addParking);
router.post("/parkingcategory", upload.single("image"), addParkingCategory);
router.get("/parkingcategory", getallcategory);
router.put("/parkingcategory/:id", upload.single("image"), updatecategory);
router.delete("/parkingcategory/:id", deletecategory);
router.get("/parkingcategory/:id", getcategorybyid);

//shop
router.post("/addshop", upload.single("image"), Addshops);
router.get("/shops", GetShops);
router.get("/shop/:id", GetShopById);

export default router;
