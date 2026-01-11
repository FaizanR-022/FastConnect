import { Plus } from "lucide-react";
import { Button } from "../../ui/button";
import { Separator } from "../../ui/separator";
import { useFieldArray } from "react-hook-form";
import ExperienceItem from "./ExperienceItem";

/**
 * Previous experiences section with dynamic field array
 * Allows adding/removing multiple work experiences
 */
export default function PreviousExperiencesSection({ control, errors }) {
  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "previousExperiences",
  });

  const handleAddExperience = () => {
    appendExperience({
      company: "",
      position: "",
      from: "",
      to: "",
    });
  };

  return (
    <>
      <Separator />

      <div>
        {/* Header with Add button */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-muted-foreground">
            Previous Experience
          </p>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddExperience}
            className="gap-1 text-primary"
          >
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </div>

        {/* Experience items */}
        {experienceFields.map((field, index) => (
          <ExperienceItem
            key={field.id}
            index={index}
            control={control}
            errors={errors}
            onRemove={() => removeExperience(index)}
          />
        ))}
      </div>
    </>
  );
}
