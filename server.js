import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import locationRoutes from "./routes/locationRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connectDB();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());

app.use("/api/locations", locationRoutes);
app.use('/api/properties', propertyRoutes);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
