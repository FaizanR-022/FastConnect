import { Trash2 } from "lucide-react";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import ControlledInput from "../../forms/ControlledInput";
import ControlledSelect from "../../forms/ControlledSelect";
import { YEARS } from "../../../constants/authConstants";

/**
 * Single previous experience item with company, position, and date range
 */
export default function ExperienceItem({ index, control, errors, onRemove }) {
  // Transform YEARS array to options format
  const yearOptions = YEARS.map((year) => ({
    value: year,
    label: year.toString(),
  }));

  return (
    <div className="relative p-4 mb-4 border rounded-lg bg-muted/30">
      {/* Remove button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="absolute top-2 right-2 h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <div className="space-y-4 mt-4">
        {/* Company Name */}
        <ControlledInput
          name={`previousExperiences.${index}.company`}
          control={control}
          label="Company Name"
          error={errors.previousExperiences?.[index]?.company?.message}
        />

        {/* Role */}
        <ControlledInput
          name={`previousExperiences.${index}.role`}
          control={control}
          label="Role"
          error={errors.previousExperiences?.[index]?.role?.message}
        />

        {/* From & To */}
        <div className="grid grid-cols-2 gap-4">
          <ControlledSelect
            name={`previousExperiences.${index}.from`}
            control={control}
            label="From"
            placeholder="Select year"
            options={yearOptions}
            error={errors.previousExperiences?.[index]?.from?.message}
          />
          <ControlledSelect
            name={`previousExperiences.${index}.to`}
            control={control}
            label="To"
            placeholder="Select year"
            options={yearOptions}
            error={errors.previousExperiences?.[index]?.to?.message}
          />
        </div>
      </div>
    </div>
  );
}
