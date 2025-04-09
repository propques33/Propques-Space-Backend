import mongoose from "mongoose";

// Manager Cabin sub-schema (supports multiple cabins)
const ManagerCabinSchema = new mongoose.Schema({
  managerName: { type: String },
  capacity: { type: Number},
  occupied: { type: Number, default: 0 },
  // Optional: an array to track per-seat occupancy status if needed
  seatStatus: { type: [Boolean], default: [] }
});

// Room sub-schema for workstations, meeting rooms, etc.
const RoomSchema = new mongoose.Schema({
  roomType: { type: String}, // e.g., "workstation", "meeting room", etc.
  capacity: { type: Number},
  occupied: { type: Number, default: 0 }
});

// Updated Inventory sub-schema
const InventorySchema = new mongoose.Schema({
  assetType: { type: String},
  assetName: { type: String },
  // Allow 0, 1, or 2 manager cabins with multi-seater capability
  managerCabins: { type: [ManagerCabinSchema], default: [] },
  // Array for various room types where seating details matter
  rooms: { type: [RoomSchema], default: [] },
  // You could calculate totalCapacity from the sum of all capacities if needed.
  totalCapacity: { type: Number},
  occupied: { type: Number, default: 0 },
  available: {
    type: Number,
    default: function() {
      return this.totalCapacity - this.occupied;
    }
  },
  bookingInfo: { type: String },
  metadata: {
    floor: Number,
    amenities: [String]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Details sub-schema remains similar
const DetailsSchema = new mongoose.Schema({
  carouselImages: [{ type: String }],
  propertyDetails: { type: String },
  aboutProperty: { type: String },
  mapLocation: { type: String },
  nearbyAmenities: [{ type: String }],
  brochure: { type: String },
  manager: {
    managerName: { type: String },
    managerImageUrl: { type: String }
  }
});

// Main Property schema
const PropertySchema = new mongoose.Schema({
  name: { type: String},
  address: { type: String },
  cityName: { type: String },
  thumbnails: { type: String },
  details: DetailsSchema,
  inventory: [InventorySchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Property", PropertySchema);
