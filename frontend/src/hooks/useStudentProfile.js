import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { updateStudentProfileSchema } from "../utils/profileValidationSchemas";
import { userService } from "../services/userService";
import useAuthStore from "../store/authStore";
import { ROUTES } from "../constants/constants";
import { toast } from "sonner";

/**
 * Custom hook for student profile management
 * Handles form state, data fetching, and submission logic
 */
export const useStudentProfile = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateStudentProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
    },
  });

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getUserProfile();

        reset({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          profilePicture: data.user.profilePicture || "",
        });
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const result = await userService.updateUserProfile(data);
      updateUser(result.user);
      setSuccess("Profile updated successfully!");
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    isDirty,
    loading,
    submitting,
    error,
    success,
    onSubmit,
  };
};
