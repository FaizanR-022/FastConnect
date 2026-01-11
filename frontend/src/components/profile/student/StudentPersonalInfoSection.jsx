import ControlledInput from "../../forms/ControlledInput";

/**
 * Personal information section for student profile
 * Handles firstName and lastName only (students have simpler profiles)
 */
export default function StudentPersonalInfoSection({ control, errors }) {
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
    </div>
  );
}
