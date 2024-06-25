import { Router } from "express";
import userController from "../controllers/userController.js";

const router = Router();

router.get("/getUserByEmail/:email",userController.getUserFromEmail);
router.post("/addTrip/:email",userController.addTripToUser)
router.post('/changePassword/:email', userController.changePassword);
router.get("/getFutureTrips/:email", userController.getFutureTripsFromEmail)
router.get("/getPastTrips/:email", userController.getPastTripsFromEmail)

export default router;