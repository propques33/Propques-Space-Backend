import express from "express";
import Property from "../models/property.js";

const router = express.Router();

// Create a new property
router.post("/", async (req, res) => {
  try {
    const property = new Property(req.body);
    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Retrieve all properties (optionally filter by city)
router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { cityName: city } : {};
    const properties = await Property.find(query);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Retrieve a property by ID (this route is now placed after /search)
// router.get('/:id', async (req, res) => {
//   try {
//     const property = await Property.findById(req.params.id);
//     if (!property)
//       return res.status(404).json({ message: 'Property not found' });
//     res.status(200).json(property);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// ✅ Get distinct cities
router.get("/cities", async (req, res) => {
  try {
    const cities = await Property.distinct("cityName");
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get center names by city
router.get("/centers", async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: "City is required" });

    const centers = await Property.find({ cityName: city }).distinct("name");
    res.status(200).json(centers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Search properties by city and/or center
router.get("/search", async (req, res) => {
  try {
    const { city, center } = req.query;
    let filter = {};
    if (city) filter.cityName = city;
    if (center) filter.name = center;

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get single property by ID (must be placed LAST)
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
