import express from "express";
import {
  getAllLocations,
  getLocationByCity,
  createLocation,
  createLocationsBulk,
  getCenterById,
} from "../controllers/locationController.js";

const router = express.Router();

router.get("/", getAllLocations);
router.get("/:cityName", getLocationByCity);
router.post("/", createLocation);
router.post("/bulk", createLocationsBulk);
router.get("/:cityName/center/:centerId", getCenterById);


export default router;
