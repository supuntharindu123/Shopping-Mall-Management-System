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

} from "./controller/membershipcontroller/membership.js";


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
router.get("/details/:username", GetUserDetails);

// Membership and rewards routes
router.post("/purchase", Purchasing);
router.post("/rewards", Rewards);
router.post("/addpkg", addMembershipPackage);
router.get("/goal/:userId", Goals);
router.get("/recommend/:userId", Reccommend);
router.post("/addrewards", addReward);


router.post("/purchasepackage", purchasepackages);
router.get("/transactions", transactionsdetails);
router.get("/pkgdetails/:id", pkgDetails);
router.delete("/removetransaction/:transactionId", removeTransaction);



export default router;
