import ControlledInput from "../../forms/ControlledInput";
import { Separator } from "../../ui/separator";

/**
 * Current position section for alumni profile
 * Handles company, position, city, and country
 */
export default function CurrentPositionSection({ control, errors }) {
  return (
    <>
      <Separator />

      <div className="space-y-6">
        <p className="text-sm font-semibold text-muted-foreground">
          Current Position
        </p>

        {/* Current Company & Position */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ControlledInput
            name="currentCompany"
            control={control}
            label="Current Company"
            error={errors.currentCompany?.message}
          />
          <ControlledInput
            name="currentPosition"
            control={control}
            label="Current Position"
            error={errors.currentPosition?.message}
          />
        </div>

        {/* Current City & Country */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ControlledInput
            name="currentCity"
            control={control}
            label="Current City"
            error={errors.currentCity?.message}
          />
          <ControlledInput
            name="currentCountry"
            control={control}
            label="Current Country"
            error={errors.currentCountry?.message}
          />
        </div>
      </div>
    </>
  );
}
