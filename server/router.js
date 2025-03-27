import { Router } from "express";
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

import { CreateParking, deleteParking, getAllParking } from "./controller/parkingcontroller.js";
import { Bookingparking } from "./controller/bookingparking.js";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello, World!");
});

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
router.get("/pkgdetails/:pkgname", pkgDetails);
router.delete("/removetransaction/:transactionId", removeTransaction);

router.post("/parking", CreateParking);
router.get('/parkings',getAllParking);
router.delete('/parkings/:id',deleteParking);
router.post('/booking',Bookingparking);

export default router;
