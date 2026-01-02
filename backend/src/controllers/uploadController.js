import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/AppError.js";

export const uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("No file uploaded", 400);
  }

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "fastconnect/profile-pictures",
        transformation: [
          { width: 500, height: 500, crop: "limit" },
          { quality: "auto:good" },
        ],
        format: "jpg",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );

    uploadStream.end(req.file.buffer);
  });

  return res.status(200).json({
    success: true,
    data: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
});

// Delete image (for future )
export const deleteImage = asyncHandler(async (req, res) => {
  const { publicId } = req.body;

  if (!publicId) {
    throw new AppError("Public ID is required", 400);
  }

  await cloudinary.uploader.destroy(publicId);

  return res.status(200).json({
    success: true,
    message: "Image deleted successfully",
  });
});
