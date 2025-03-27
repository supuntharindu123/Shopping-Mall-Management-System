import { Router } from "express";
import { CreateParking, deleteParking, getAllParking } from "./controller/parkingcontroller.js";
import { Bookingparking } from "./controller/bookingparking.js";

const router = Router();


router.post("/parking", CreateParking);
router.get('/parkings',getAllParking);
router.delete('/parkings/:id',deleteParking);
router.post('/booking',Bookingparking);
export default router;
