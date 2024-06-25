import { Router } from "express";
import tripsController from "../controllers/tripsController.js";

const router = Router();

router.get("/trips",tripsController.getTripFromInfo);
router.get("/tripFromId/:tripid",tripsController.getTripFromTripid)

export default router;