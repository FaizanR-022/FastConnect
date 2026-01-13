import * as yup from "yup";

export const updateStudentProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),

  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),

  profilePicture: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),
});

export const updateAlumniProfileSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must not exceed 50 characters")
    .required("First name is required"),

  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must not exceed 50 characters")
    .required("Last name is required"),

  currentCompany: yup
    .string()
    .min(2, "Company name must be at least 2 characters")
    .required("Current company is required"),

  currentPosition: yup
    .string()
    .min(2, "Position must be at least 2 characters")
    .required("Current position is required"),

  currentCity: yup.string().required("City is required"),

  currentCountry: yup.string().required("Country is required"),

  phone: yup
    .string()
    .nullable()
    .transform((value, originalValue) => {
      return originalValue === "" ? null : value;
    })
    .matches(
      /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
      "Please enter a valid phone number"
    )
    .optional(),

  linkedin: yup.string().nullable().optional(),

  profilePicture: yup
    .string()
    .url("Please enter a valid URL")
    .nullable()
    .optional(),

  previousExperiences: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().optional(),
        company: yup.string().required("Company name is required"),
        role: yup.string().required("Role is required"),
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
    .optional(),

  skills: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().optional(),
        name: yup
          .string()
          .min(2, "Skill name must be at least 2 characters")
          .required("Skill name is required"),
      })
    )
    .optional(),
});
