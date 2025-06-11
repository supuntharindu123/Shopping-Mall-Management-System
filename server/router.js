import { Router } from "express";

import multer from "multer";
import path from "path";

// Import controllers
import {
  DeleteUser,
  GetAllUsers,
  GetUserById,
  GetUserDetails,
  LoginUser,
  RegisterUser,
  UpdateUser,
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
  updateReward,
  deleteReward,
  getAllRewards,
  getRewardById,
  getTransactionsByUserId,
  redeemReward,
  getRewardRedemptionsByUserId,
  getAllRedemptionHistory,
  packagereport,
} from "./controller/membershipcontroller/membership.js";

import {
  addParkingCategory,
  checkAvailability,
  deletecategory,
  getallcategory,
  getAllParkingBookings,
  getBookingsByUsername,
  getcategorybyid,
  ParkingBook,
  updateBookingStatus,
  updatecategory,
} from "./controller/parkingcontroller/parkingcontroller.js";


// Router setup
const router = Router();


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// User routes
router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/user/:id", GetUserById);
router.get("/users", GetAllUsers);
router.put("/users/:id", UpdateUser);
router.delete("/users/:id", DeleteUser);
router.get("/details/:username", GetUserDetails);

// Membership routes
router.post("/purchase", Purchasing);
router.post("/purchasepackage", purchasepackages);
router.get("/transactions", transactionsdetails);
router.get("/pkgdetails/:id", pkgDetails);
router.delete("/removetransaction/:transactionId", removeTransaction);
router.get("/packages", getUserMembershipPackage);
router.put("/packages/:id", updatePackage);
router.delete("/packages/:id", removepkg);
router.get("/pkg", getAllPackages);
router.get("/transaction/:userId", getTransactionsByUserId);
router.get("/package/report", packagereport);

// Rewards routes
router.post("/rewards", Rewards);
router.post("/addrewards", addReward);
router.put("/rewards/:id", updateReward);
router.delete("/rewards/:id", deleteReward);
router.get("/rewards/:id", getRewardById);
router.get("/rewards", getAllRewards);
router.post("/rewards/redeem", redeemReward);
router.get("/rewards/history/:userId", getRewardRedemptionsByUserId);
router.get("/rewards/history", getAllRedemptionHistory);

// Goals and recommendations
router.get("/goal/:userId", Goals);
router.get("/recommend/:userId", Reccommend);

// Parking routes
router.post("/booking", ParkingBook);
router.get("/getbooking", getAllParkingBookings);
router.get("/check-availability", checkAvailability);
router.post("/parkingcategory", upload.single("image"), addParkingCategory);
router.get("/parkingcategory", getallcategory);
router.put("/parkingcategory/:id", upload.single("image"), updatecategory);
router.delete("/parkingcategory/:id", deletecategory);
router.get("/parkingcategory/:id", getcategorybyid);
router.patch("/booking/:bookingId", updateBookingStatus);
router.get("/booking/:username", getBookingsByUsername);




export default router;
