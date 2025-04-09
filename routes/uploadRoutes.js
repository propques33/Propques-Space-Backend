import express from 'express';
import multer from 'multer';
import streamifier from 'streamifier';
import { v2 as cloudinary } from 'cloudinary';

const router = express.Router();

// Configure multer to store file in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Set up Cloudinary credentials via environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// POST /api/upload - Upload an image to Cloudinary
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const uploadStream = cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
    if (error) return res.status(500).json({ error: error.message });
    // Return the Cloudinary URL; frontend can then update the DB with this URL.
    res.status(200).json({ url: result.secure_url });
  });

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
});

export default router;
