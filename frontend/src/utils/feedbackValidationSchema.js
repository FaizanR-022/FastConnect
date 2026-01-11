import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must not exceed 200 characters")
    .trim(),

  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message must not exceed 5000 characters")
    .trim(),
});
