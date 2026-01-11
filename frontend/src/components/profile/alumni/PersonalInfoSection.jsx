import ControlledInput from "../../forms/ControlledInput";

/**
 * Personal information section for alumni profile
 * Handles firstName, lastName, and phone
 */
export default function PersonalInfoSection({ control, errors }) {
  return (
    <div className="space-y-6">
      <p className="text-sm font-semibold text-muted-foreground">
        Personal Information
      </p>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ControlledInput
          name="firstName"
          control={control}
          label="First Name"
          error={errors.firstName?.message}
        />
        <ControlledInput
          name="lastName"
          control={control}
          label="Last Name"
          error={errors.lastName?.message}
        />
      </div>

      {/* Phone */}
      <ControlledInput
        name="phone"
        control={control}
        label="Phone Number"
        placeholder="+92 300 1234567"
        error={errors.phone?.message}
        optional
      />
    </div>
  );
}
