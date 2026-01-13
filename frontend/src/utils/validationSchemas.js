import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim(),
});

export const studentSignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .trim(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@nu\.edu\.pk$/,
      "Please use your @nu.edu.pk email address"
    )
    .required("University email is required")
    .trim(),
  campus: yup.string().required("Campus is required").trim(),
  department: yup.string().required("Department is required").trim(),
  batch: yup
    .number()
    .required("Batch year is required")
    .min(2000, "Invalid batch year")
    .max(new Date().getFullYear() + 5, "Invalid batch year"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password")
    .trim(),
  profilePicture: yup
    .string()
    .url("Please enter a valid URL")
    .notRequired()
    .trim(),
});

export const alumniSignupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .trim(),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .trim(),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address"
    )
    .required("Email is required")
    .trim(),
  phone: yup
    .string()
    // to avoid validating empty strings
    .nullable()
    .transform((value, originalValue) => {
      // If empty string, return null so it doesn't validate
      return originalValue === "" ? null : value;
    })
    .notRequired()
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    )
    .trim(),
  campus: yup.string().required("Campus is required").trim(),
  department: yup.string().required("Department is required").trim(),
  graduationYear: yup
    .number()
    .required("Graduation year is required")
    .min(2000, "Invalid graduation year")
    .max(new Date().getFullYear(), "Graduation year cannot be in the future"),
  currentCompany: yup
    .string()
    .required("Current company is required")
    .min(2, "Company name must be at least 2 characters")
    .trim(),
  currentPosition: yup
    .string()
    .required("Current position is required")
    .min(2, "Position must be at least 2 characters")
    .trim(),
  previousCompanies: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required("Company name is required").trim(),
        role: yup.string().required("Role is required").trim(),
        from: yup
          .number()
          .required("Start year is required")
          .min(2000, "Invalid year")
          .max(new Date().getFullYear(), "Year cannot be in the future"),
        to: yup
          .number()
          .required("End year is required")
          .min(2000, "Invalid year")
          .max(new Date().getFullYear(), "Year cannot be in the future")

          // test (name, message, testFunction)
          .test(
            "is-greater",
            "End year must be after start year",
            function (value) {
              const { from } = this.parent;
              return value >= from;
            }
          ),
      })
    )
    .notRequired(),
  city: yup.string().required("City is required").trim(),
  country: yup.string().required("Country is required").trim(),
  linkedin: yup
    .string()
    .required("LinkedIn profile is required")
    .trim()
    .url("Please enter a valid LinkedIn URL")
    .matches(
      /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/.+$/,
      "Please enter a valid LinkedIn profile URL"
    ),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
    .trim(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password")
    .trim(),
  profilePicture: yup
    .string()
    .url("Please enter a valid URL")
    .notRequired()
    .trim(),
});
