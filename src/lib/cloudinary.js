import "server-only";
import { v2 as cloudinary } from "cloudinary";

// Server-side Cloudinary client. The API secret stays on the server — never
// shipped to the browser.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
