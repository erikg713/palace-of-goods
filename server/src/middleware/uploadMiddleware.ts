import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage engine for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "palace-of-goods",
    allowed_formats: ["jpeg", "png", "jpg"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// Configure Multer middleware
const upload = multer({ storage });

export default upload;
