import { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Typography,
  CircularProgress,
  IconButton,
  Stack,
} from "@mui/material";
import { Upload, X } from "lucide-react";
import api from "../../services/api";

function ImageUpload({ value, onChange, label = "Profile Picture" }) {
  const [preview, setPreview] = useState(value || null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Reset error
    setError(null);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    // Create local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await api.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Update parent with Cloudinary URL
      onChange(response.data.data.url);
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.response?.data?.message || "Failed to upload image");
      setPreview(value || null); // Revert to original on error
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
    setError(null);
  };

  return (
    <Box>
      <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
        {label}
      </Typography>

      <Stack direction="row" alignItems="center" spacing={2}>
        {/* Avatar Preview */}
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={preview}
            sx={{
              width: 80,
              height: 80,
              border: "2px solid",
              borderColor: "divider",
            }}
          />
          {uploading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "rgba(0,0,0,0.5)",
                borderRadius: "50%",
              }}
            >
              <CircularProgress size={30} sx={{ color: "white" }} />
            </Box>
          )}
          {preview && !uploading && (
            <IconButton
              size="small"
              onClick={handleRemove}
              sx={{
                position: "absolute",
                top: -5,
                right: -5,
                bgcolor: "background.paper",
                boxShadow: 1,
                "&:hover": { bgcolor: "error.light", color: "white" },
              }}
            >
              <X size={16} />
            </IconButton>
          )}
        </Box>

        {/* Upload Button */}
        <Box sx={{ flex: 1 }}>
          <Button
            variant="outlined"
            component="label"
            startIcon={<Upload size={18} />}
            disabled={uploading}
            size="small"
          >
            {uploading
              ? "Uploading..."
              : preview
              ? "Change Photo"
              : "Upload Photo"}
            <input
              type="file"
              hidden
              accept="image/jpeg,image/png,image/jpg,image/webp"
              onChange={handleFileSelect}
              disabled={uploading}
            />
          </Button>

          {error && (
            <Typography
              variant="caption"
              color="error"
              sx={{ display: "block", mt: 0.5 }}
            >
              {error}
            </Typography>
          )}

          {!error && (
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 0.5, color: "text.secondary" }}
            >
              Max 5MB • JPG, PNG, WEBP
            </Typography>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default ImageUpload;
