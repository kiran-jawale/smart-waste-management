import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  async upload(localFilePath, folderName = 'smartpeepal_reports') {
    try {
      if (!localFilePath) return null;

      const response = await cloudinary.uploader.upload(localFilePath, {
        resource_type: 'auto',
        folder: folderName,
      }); 
      
      // Delete the file from your local 'public/temp' folder after successful upload
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }

      return response;
    } catch (error) { 
      console.error(`🔴 CLOUDINARY UPLOAD FAILED:`, error.message || error);
 
      // Ensure the local file is still deleted even if the cloud upload fails
      if (fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
      return null;
    }
  }

  async delete(publicId, resourceType = 'image') {
    try {
      if (!publicId) return null;
      
      const response = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
      });
      return response;
    } catch (error) {
      console.error(`🔴 CLOUDINARY DELETE FAILED:`, error.message || error);
      return null;
    }
  }
}

export default new CloudinaryService();