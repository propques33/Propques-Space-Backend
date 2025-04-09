import Location from "../models/location.js";

export const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getLocationByCity = async (req, res) => {
  try {
    const location = await Location.findOne({ cityName: req.params.cityName });
    if (!location) return res.status(404).json({ error: "Location not found" });
    res.json(location);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLocation = async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createLocationsBulk = async (req, res) => {
  try {
    const inserted = await Location.insertMany(req.body);
    res.status(201).json(inserted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getCenterById = async (req, res) => {
    const { cityName, centerId } = req.params;
    try {
      const location = await Location.findOne({ cityName });
      if (!location) return res.status(404).json({ error: "City not found" });
  
      const center = location.subLocations.find(
        (sub) => sub._id.toString() === centerId
      );
  
      if (!center) return res.status(404).json({ error: "Center not found" });
  
      res.json(center);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  