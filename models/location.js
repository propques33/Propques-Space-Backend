import mongoose from "mongoose";
const { Schema } = mongoose;

const ManagerSchema = new Schema({
  name: { type: String },
  imageUrl: { type: String }
});

const SubLocationSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String },
  imageUrl: { type: String },
  details: {
    carouselImages: [{ type: String }],
    propertyDetails: { type: String },
    aboutProperty: { type: String },
    mapLocation: { type: String },
    nearbyAmenities: [{ type: String }],
    brochure: { type: String },
    manager: ManagerSchema
  }
});

const LocationSchema = new Schema({
  cityName: { type: String, unique: true, required: true },
  subLocations: [SubLocationSchema]
});

export default mongoose.model("Location", LocationSchema);
