import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { updateAlumniProfileSchema } from "../utils/profileValidationSchemas";
import { userService } from "../services/userService";
import useAuthStore from "../store/authStore";
import { ROUTES } from "../constants/constants";
import { toast } from "sonner";

/**
 * Custom hook for alumni profile management
 * Handles form state, data fetching, and submission logic
 */
export const useAlumniProfile = () => {
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
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(updateAlumniProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      currentCompany: "",
      currentPosition: "",
      currentCity: "",
      currentCountry: "",
      linkedin: "",
      profilePicture: "",
      previousExperiences: [],
      skills: [],
    },
  });

  const skills = watch("skills") || [];

  // Fetch user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await userService.getUserProfile();

        // Pre-fill form with current data
        reset({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          phone: data.user.phone || "",
          currentCompany: data.user.currentCompany || "",
          currentPosition: data.user.currentPosition || "",
          currentCity: data.user.currentCity || "",
          currentCountry: data.user.currentCountry || "",
          linkedin: data.user.linkedIn || "",
          profilePicture: data.user.profilePicture || "",
          previousExperiences: data.user.previousExperiences || [],
          skills: data.user.skills || [],
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

      // Update Zustand store with new user data
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
    // Form control
    control,
    handleSubmit,
    errors,
    isDirty,
    setValue,

    // Data
    skills,

    // State
    loading,
    submitting,
    error,
    success,

    // Handlers
    onSubmit,
  };
};
